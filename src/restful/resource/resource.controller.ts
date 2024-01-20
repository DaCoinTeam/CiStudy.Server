import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common"
import { ResourceService } from "./resource.service"
import { UpdateResourceDto } from "./dto/update-resource.dto"
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from "@nestjs/swagger"
import createSchema from "./schema/upload.schema"
import { FileInterceptor } from "@nestjs/platform-express"
import { ResourceDto } from "./dto/resource.dto"

@ApiTags("resource")
@Controller("api/resource")
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Resource File belong to a lecture",
    schema: createSchema,
  })
  @UseInterceptors(FileInterceptor("resourceLink"))
  @Post()
  async create(
    @Body() createResourceDto: ResourceDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResourceDto> {
    return await this.resourceService.create(createResourceDto, file)
  }

  @Get()
  findAll() {
    return this.resourceService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.resourceService.findOne(+id)
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourceService.update(+id, updateResourceDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.resourceService.remove(+id)
  }
}
