import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger"
import { CreateReponseDto, CreateRequestDto } from "./dto"
import { JwtAuthGuard, User } from "../shared"
import { UserPayload } from "@shared"
import CourseService from "./course.service"

@ApiTags("Courses")
@Controller("api/course")
export default class CourseController {
	constructor(private readonly courseService: CourseService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateReponseDto })
  @UseGuards(JwtAuthGuard)
  @Post()
	async create(@User() user: UserPayload, @Body() body: CreateRequestDto) {
		return await this.courseService.create(user, body)
	}

	// @ApiOkResponse({ type: CreateRequestDto })
	// @Get(":id")
	// async getCourseById(@Param("id") id: string): Promise<CreateRequestDto> {
	// 	return await this.courseService.findById(id)
	// }

	// @Get()
	// @ApiOkResponse()
	// async getAllCourse() {
	// 	return await this.courseService.findAll()
	// }
}
