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

@Injectable()
export default class VideoManagerService {
  constructor(
    private readonly assetManagerService: AssetManagerService,
    private readonly bento4Service: Bento4Service,
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
      true
    )
    await this.processVideo(assetId, fileName)

    return assetId
  }

  private async processVideo(assetId: string, videoName: string) {
    console.info("🔰 1/5 | Video Health")
    // await ffmpeg.checkVideoHealth();
    console.info("🔰 2/5 | Checking Video")
    const fragmentationRequired = await this.bento4Service.checkFragments(
      assetId,
      videoName,
    )
    console.info("🔰 3/5 | Fragmenting Video")
    if (fragmentationRequired) {
      await this.bento4Service.fragmentVideo(assetId, videoName)
    }
    console.info("🔰 4/5 | Processing Video")
    await this.bento4Service.processVideo(assetId, videoName)
    console.info("🔰 5/5 | Clean Up & Relocate & Create Metadata")
    await this.cleanUp(assetId)
    await this.relocate(assetId)
    await this.createMetadata(assetId)
  }

  private async cleanUp(assetId: string) {
    const assetDir = join(assetConfig().path, assetId)
    const files = await promises.readdir(assetDir)

    await Promise.all(
      files
        .filter((file) => file !== "output")
        .map(async (file) => {
          const filePath = join(assetDir, file)
          const fileStat = await promises.stat(filePath)

          if (fileStat.isDirectory()) {
            await promises.rmdir(filePath, { recursive: true })
          } else {
            await promises.unlink(filePath)
          }
        }),
    )
  }

  private async relocate(assetId: string) {
    const assetDir = join(assetConfig().path, assetId)
    const outputFilesPath = join(assetDir, "output")
    const outputFiles = await promises.readdir(outputFilesPath)
    await Promise.all(
      outputFiles.map(async (file) => {
        const sourcePath = join(outputFilesPath, file)
        const destinationPath = join(assetDir, file)
        await promises.rename(sourcePath, destinationPath)
      }),
    )
    await promises.rmdir(join(assetDir, "output"))
  }

  private async createMetadata(assetId: string) {
    const assetDir = join(assetConfig().path, assetId)
    const stats = await promises.stat(join(assetDir, "manifest.mpd"))
    const metadata: AssetMetadata = {
      assetId,
      extension: "mpd",
      fileName: "manifest.mpd",
      fileSize: stats.size
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
