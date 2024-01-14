import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common"
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger"
import { CreateReponseDto, CreateRequestDto } from "./dto"
import { AuthInterceptor, JwtAuthGuard, User } from "../shared"
import { UserDto } from "@shared"
import CourseService from "./course.service"
import { FileInterceptor } from "@nestjs/platform-express"
import { FirebaseService } from "@global"

@ApiTags("Course")
@Controller("api/course")
export default class CourseController {
	constructor(private readonly courseService: CourseService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateReponseDto })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
  	description: "Course File",
  	schema: {
  		type: "object",
  		properties: {
  			thumbnailUrl: {
  				type: "string",
  				format: "binary",
  			},
  			title: {
  				type: "string",
  			},
  			description: {
  				type: "string",
  			},
  			price: {
  				type: "number",
  			},
  			previewVideoUrl: {
  				type: "string",
  				format: "binary",
  			},
  			targets: {
  				type: "array",
  				items: {
  					type: "string",
  				},
  			},
  			includes: {
  				type: "object",
  				properties: {
  					property1: {
  						type: "string",
  					},
  				},
  			},
  		},
  	},
  })
  @ApiBadRequestResponse()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthInterceptor)
  @Post()
  @UseInterceptors(FileInterceptor("thumbnailUrl"))
	async create(
    @User() user: UserDto,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateRequestDto,
	) {
		console.log(file)
		const newFireBaseService = new FirebaseService()
		const url = await newFireBaseService.uploadFile(file.buffer)
		console.log(url)
		return await this.courseService.create(user, body)
	}

  @ApiOkResponse({ type: CreateRequestDto })
  @ApiNotFoundResponse()
  @Get(":id")
  async getById(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<CreateReponseDto> {
  	return await this.courseService.findById(id)
  }

  @Get()
  @ApiOkResponse()
  async getAll(): Promise<CreateReponseDto[]> {
  	return await this.courseService.findAll()
  }

  @Delete(":id")
  @ApiBadRequestResponse()
  async delete(@Param("id", ParseUUIDPipe) id: string) {
  	// return await this.courseService.delete(id)
  }
}
