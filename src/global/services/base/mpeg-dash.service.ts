import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  StreamableFile,
} from "@nestjs/common"
import { Response } from "express"
import { createReadStream, promises } from "fs"
import Bento4Service from "./bento4.service"

import AssetManagerService from "./asset-manager.service"
import { assetConfig } from "@config"
import { join } from "path"
import { AssetMetadata } from "@shared"
import FfmpegService from "./ffmpeg.service"

@Injectable()
export default class MpegDashService {
  constructor(
    private readonly assetManagerService: AssetManagerService,
    private readonly bento4Service: Bento4Service,
    private readonly ffmpegService: FfmpegService
  ) {}

  private isValidVideoExtension(fileName: string): boolean {
    const supportedExtensions = [
      "mp4",
      "avi",
      "mkv",
      "mov",
      "wmv",
      "flv",
      "webm",
    ]
    const lowerCaseExtension = fileName.split(".").pop()?.toLowerCase() || ""
    return supportedExtensions.includes(lowerCaseExtension)
  }

  async uploadVideoAndGenerateStream(
    file: Express.Multer.File,
  ): Promise<string> {
    if (!this.isValidVideoExtension(file.originalname))
      throw new BadRequestException("Video extension not supported.")

    const { assetId, fileName } = await this.assetManagerService.uploadAsset(
      file,
      true,
    )
    await this.generateStream(assetId, fileName)
    return assetId
  }

  private async generateStream(assetId: string, videoName: string) {
    Logger.log("2/5. Encoding")
    await this.ffmpegService.encodeAtMultipleBitrates(assetId, videoName)

    const promises: Promise<void>[] = []

    const encodedNames = [
      "1080.mp4",
      "720.mp4",
      "480.mp4",
      "360.mp4",
      "240.mp4",
    ]

    Logger.log("2/5. Fragmenting")
    for (const encodedName of encodedNames) {
      const promise = async () => {
        const fragmentationRequired = await this.bento4Service.checkFragments(
          assetId,
          encodedName,
        )
        if (fragmentationRequired) {
          await this.bento4Service.fragmentVideo(assetId, encodedName)
        }
      }
      promises.push(promise())
    }
    await Promise.all(promises)

    Logger.log("3/5. Processing")
    await this.bento4Service.processVideo(assetId, encodedNames)

    Logger.log("4/5. Cleaning up")
    await this.cleanUp(assetId)

    Logger.log("5/5. Creating manifest metadata")
    await this.createManifestMetadata(assetId)
  }

  private async cleanUp(assetId: string) {
    const assetDir = join(assetConfig().path, assetId)
    const files = await promises.readdir(assetDir)

    await Promise.all(
      files
        .filter(
          (file) =>
            file !== "manifest.mpd" && file !== "audio" && file !== "video",
        )
        .map(async (file) => {
          const filePath = join(assetDir, file)
          const fileStat = await promises.stat(filePath)

          if (fileStat.isDirectory()) {
            await promises.rmdir(filePath)
          } else {
            await promises.unlink(filePath)
          }
        }),
    )
  }

  private async createManifestMetadata(assetId: string) {
    const assetDir = join(assetConfig().path, assetId)
    const stat = await promises.stat(join(assetDir, "manifest.mpd"))
    const metadata: AssetMetadata = {
      assetId,
      extension: "mpd",
      fileName: "manifest.mpd",
      fileSize: stat.size,
    }
    await this.assetManagerService.createMetadata(metadata)
  }

  getStreamableVideo(mpdFilePath: string, res: Response) {
    res.status(HttpStatus.OK)
    const readable = createReadStream(mpdFilePath)
    console.log(readable)
    return new StreamableFile(readable, {
      disposition: "attachment; filename=manifest.mpd",
      type: "application/dash+xml",
    })
  }
}
