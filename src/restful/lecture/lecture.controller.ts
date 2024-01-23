import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import LectureService from "./lecture.service"
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger"
import createSchema from "./schemas/create.schema"
import { FileInterceptor } from "@nestjs/platform-express"
import LectureDto from "./dto/lecture.dto"
import { JwtAuthGuard } from "src/graphql/shared"

@ApiTags("lecture")
@Controller("api/lecture")
export default class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @ApiQuery({
    name: "clientId",
    example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({ schema: createSchema })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("videoFile"))
  @Post()
  create(
    @Body() body: LectureDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.lectureService.create(body, file)
  }
}
