import { assetConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { AssetMetadata } from "@shared"
import { promises } from "fs"
import path, { join } from "path"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export default class AssetManagerService {
  async createMetadata(metadata: AssetMetadata) {
    const assetDir = path.join(assetConfig().path, metadata.assetId)
    await promises.writeFile(
      join(assetDir, "metadata.json"),
      JSON.stringify(metadata),
    )
  }

  async uploadAsset(
    file: Express.Multer.File,
    createMetadata: boolean = true,
  ): Promise<AssetMetadata> {
    const assetId = uuidv4()
    const assetDir = path.join(assetConfig().path, assetId)

    await promises.mkdir(assetDir, { recursive: true })
    const assetPath = path.join(assetDir, file.originalname)
    await promises.writeFile(assetPath, file.buffer)

    const metadata: AssetMetadata = {
      assetId,
      fileName: file.originalname,
      extension: file.originalname.split(".").at(-1),
      fileSize: file.size,
    }

    if (createMetadata) this.createMetadata(metadata)

    return metadata
  }
}
