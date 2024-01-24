import {
  BadRequestException,
  HttpStatus,
  Injectable,
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
export default class VideoManagerService {
  constructor(
    private readonly assetManagerService: AssetManagerService,
    private readonly bento4Service: Bento4Service,
    private readonly ffmpegService: FfmpegService,
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

  async uploadVideo(file: Express.Multer.File): Promise<string> {
    if (!this.isValidVideoExtension(file.originalname))
      throw new BadRequestException("Video extension not supported.")

    const { assetId, fileName } = await this.assetManagerService.uploadAsset(
      file,
      true,
    )
    await this.processVideo(assetId, fileName)

    return assetId
  }

  private async processVideo(assetId: string, videoName: string) {
    await this.ffmpegService.encodeAtMultipleBitrates(assetId, videoName)

    const encodedNames = ["720.mp4", "480.mp4", "360.mp4", "240.mp4"]
    for (const encodedName of encodedNames) {
      const fragmentationRequired = await this.bento4Service.checkFragments(
        assetId,
        encodedName,
      )
      if (fragmentationRequired) {
        await this.bento4Service.fragmentVideo(assetId, encodedName)
      }
    }

    await this.bento4Service.processVideo(assetId, encodedNames)
    await this.cleanUp(assetId)
    await this.createMetadata(assetId)
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

  private async createMetadata(assetId: string) {
    const assetDir = join(assetConfig().path, assetId)
    const stats = await promises.stat(join(assetDir, "manifest.mpd"))
    const metadata: AssetMetadata = {
      assetId,
      extension: "mpd",
      fileName: "manifest.mpd",
      fileSize: stats.size,
    }
    await promises.writeFile(
      join(assetDir, "metadata.json"),
      JSON.stringify(metadata),
    )
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
