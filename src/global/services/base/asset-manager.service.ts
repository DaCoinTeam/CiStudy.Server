import { assetConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { AssetMetadata } from "@shared"
import { promises } from "fs"
import path, { join } from "path"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export default class AssetManagerService {
  async uploadAsset(file: Express.Multer.File, noManifest: boolean = false): Promise<AssetMetadata> {
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

    if (!noManifest){
      await promises.writeFile(
        join(assetDir, "metadata.json"),
        JSON.stringify(metadata),
      )
    }

    return metadata
  }
}

