import { Controller, Get, Param, UseGuards } from "@nestjs/common"
import AssetService from "./asset.service"
import { ApiParam, ApiTags } from "@nestjs/swagger"
import { Metadata } from "../shared"
import { AssetMetadata } from "@shared"
import { PublicGuard } from "./guards"

@ApiTags("Asset")
@Controller("api/asset")
export default class AssetController {
  constructor(private readonly assetService: AssetService) {}

  // @Get("public/:assetId")
  // async getPublic(@Param("assetId") assetId: string) {
  //   return this.assetService.getPublic(assetId)
  // }

  @ApiParam({
    name: "assetId",
    example: "62d552b3-67fc-41c3-bd0b-ca4f7e8719fa",
  })
  @ApiParam({ name: "0", example: "Ignore me please", required: false })
  @UseGuards(PublicGuard)
  @Get("public/:assetId*")
  async getPublic(
    @Metadata() metadata: AssetMetadata,
    @Param("0") rest: string,
  ) {
    return this.assetService.getPublic(metadata, rest)
  }
}
