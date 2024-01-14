import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common"
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger"
import { CreateReponseDto, CreateRequestDto } from "./dto"
import { AuthInterceptor, JwtAuthGuard, User } from "../shared"
import { UserDto } from "@shared"
import CourseService from "./course.service"

@ApiTags("Course")
@Controller("api/course")
export default class CourseController {
	constructor(private readonly courseService: CourseService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateReponseDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthInterceptor)
  @Post()
	async create(@User() user: UserDto, @Body() body: CreateRequestDto) {
		return await this.courseService.create(user, body)
	}

//   @ApiOkResponse({ type: CreateRequestDto })
//   @ApiNotFoundResponse()
//   @Get(":id")
//   async getById(@Param("id", ParseUUIDPipe) id: string): Promise<CreateRequestDto> {
//   	return await this.courseService.findById(id)
//   }

//   @Get()
//   @ApiOkResponse()
//   async getAll(): Promise<CreateReponseDto[]> {
//   	return await this.courseService.findAll()
//   }

//   @Delete(":id")
//   @ApiBadRequestResponse()
//   async delete(@Param("id", ParseUUIDPipe) id: string) {
//   	return await this.courseService.delete(id)
//   }
}
