import { assetConfig } from "@config"
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { AssetMetadata } from "@shared"
import { readFileSync } from "fs"
import { join } from "path"
import { Observable } from "rxjs"

@Injectable()
export default class PublicGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    try {
      const assetId = request.params.assetId
      const assetDir = join(assetConfig().path, assetId)
      const readed = readFileSync(join(assetDir, "metadata.json"), {
        encoding: "utf8",
      })

      const metadata = JSON.parse(readed) as AssetMetadata
      request.metadata = metadata

      return this.isValid(metadata)
    } catch (ex) {
      console.error(ex)
      return false
    }
  }

  private isValid(metadata: AssetMetadata) {
    //append more logicc
    return !metadata.visibility
  }
}
