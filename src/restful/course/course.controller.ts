import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  StreamableFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger"
import {
  CreateReponseDto,
  CourseDto,
  EnrollRequestDto,
  StreamPreviewRequestDto,
} from "./dto"
import { AuthInterceptor, JwtAuthGuard, User } from "../shared"
import CourseService from "./course.service"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { swaggerSchema } from "./dto/create/course.dto"
import { Response } from "express"
import { UserMySqlEntity } from "@database"

@ApiTags("Course")
@Controller("api/course")
export default class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateReponseDto })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Course File",
    schema: swaggerSchema,
  })
  @ApiBadRequestResponse()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthInterceptor)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "thumbnailUrl", maxCount: 1 },
      { name: "previewVideoUrl", maxCount: 1 },
    ]),
  )
  async create(
    @User() user: UserMySqlEntity,
    @UploadedFiles()
    files: {
      thumbnailUrl?: Express.Multer.File[];
      previewVideoUrl?: Express.Multer.File[];
    },
    @Body() body: CourseDto,
  ) {
    console.log("body", body)
    return await this.courseService.create(user, files, body)
  }

  @Get()
  @ApiOkResponse()
  async getAll(): Promise<CreateReponseDto[]> {
    return await this.courseService.findAll()
  }

  @Delete(":id")
  @ApiBadRequestResponse()
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    return await this.courseService.delete(id)
  }

  @Get("stream-preview")
 // @UseGuards(JwtAuthGuard)
  async getFile(
    @Headers("range") range: string,
    // @Body() body: StreamPreviewRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (range) {
      console.log(range)
      return await this.courseService.streamPreview(range, res)
    }
    throw new BadRequestException(
      "Invalid request. Video streaming requires a 'Range' header.",
    )
  }

  @Post("enroll")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async enrollToCourse(
    @User() user: UserMySqlEntity,
    @Body() body: EnrollRequestDto,
  ) {
    await this.courseService.enroll(user, body)
  }
}
