import { Controller, Get, UseGuards } from "@nestjs/common"
import AssetService from "./asset.service"
import { ApiTags } from "@nestjs/swagger"
import { PublicAssetGuard } from "./guards"
import { Metadata } from "../shared"
import { AssetMetadata } from "@shared"

@ApiTags("Asset")
@Controller("api/asset")
export default class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @UseGuards(PublicAssetGuard)
  @Get("public/:id")
  async getPublic(@Metadata() metadata: AssetMetadata) {
    return this.assetService.getPublic(metadata)
  }
}
