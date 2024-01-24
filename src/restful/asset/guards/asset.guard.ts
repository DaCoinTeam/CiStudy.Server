import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { Observable } from "rxjs"
import { assetConfig } from "@config"
import { AssetMetadata } from "@shared"
import { readFileSync } from "fs"
import { join } from "path"

@Injectable()
export default class PublicAssetGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    try {
      const assetId = request.params.id
      console.log(assetId)
      const assetDir = join(assetConfig().path, assetId)
      const readed = readFileSync(join(assetDir, "metadata.json"), {
        encoding: "utf8",
      })
      console.log(readed)
      const metadata = JSON.parse(readed) as AssetMetadata
      console.log(metadata)
      const valid = this.isValid(metadata)
      if (valid) request.metadata = metadata
      return valid
    } catch (ex) {
      throw new NotFoundException("Asset not found.")
    }
  }

  private isValid(metadata: AssetMetadata) {
    // implements other validations
    return !metadata.visibility
  }
}
