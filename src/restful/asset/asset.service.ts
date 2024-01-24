import { assetConfig } from "@config"
import { Injectable, NotFoundException, StreamableFile } from "@nestjs/common"
import { AssetMetadata } from "@shared"
import { createReadStream } from "fs"
import { join } from "path"

@Injectable()
export default class AssetService {
  private getContentType(extension: string) {
    const extensionToContentType: Record<string, string> = {
      mpd: "application/dash+xml",
      mp4: "video/mp4",
      png: "image/png",
      bmp: "image/bmp",
    }
    const lowercasedExtension = extension.toLowerCase()
    return extensionToContentType[lowercasedExtension]
  }

  getPublic(metadata: AssetMetadata, rest: string) {
    try {
      const { assetId, fileName, extension } = metadata
      const relativePath = rest || fileName
      const filePath = join(assetConfig().path, assetId, relativePath)
      const stream = createReadStream(filePath)

      return new StreamableFile(stream, {
        disposition: `attachment; filename="${fileName}"`,
        type: this.getContentType(extension),
      })
    } catch (ex) {
      throw new NotFoundException("")
    }
  }
}
