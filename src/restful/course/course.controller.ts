import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
	Headers,
	Param,
	ParseUUIDPipe,
	Post,
	Req,
	Res,
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
import { CreateReponseDto, CreateRequestDto, EnrollRequestDto } from "./dto"
import { AuthInterceptor, JwtAuthGuard, User } from "../shared"
import { UserMySqlDto } from "@shared"
import CourseService from "./course.service"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { swaggerSchema } from "./dto/create/request.dto"

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
    @User() user: UserMySqlDto,
    @UploadedFiles()
    	files: {
      thumbnailUrl?: Express.Multer.File[];
      previewVideoUrl?: Express.Multer.File[];
    },
    @Body() body: CreateRequestDto,
	) {
		return await this.courseService.create(user, files, body)
	}

  //   @ApiOkResponse({ type: CreateRequestDto })
  //   @ApiNotFoundResponse()
  //   @Get(":id")
  //   async getById(
  //     @Param("id", ParseUUIDPipe) id: string,
  //   ): Promise<CreateReponseDto> {
  //   	return await this.courseService.findById(id)
  //   }

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

  @Get("stream")
  async getFile(@Headers("range") range: string) {
  	console.log(range)
  	return this.courseService.getFile()
  }

  @Post("enroll")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async enrollToCourse(
    @User() user: UserMySqlDto,
    @Body() body: EnrollRequestDto,
  ) {
  	await this.courseService.enroll(user, body)
  }
}
