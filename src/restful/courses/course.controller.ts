import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger"
import { CreateRequestDto } from "./dto"
import { JwtAuthGuard, User } from "../shared"
import { UserDto } from "@shared"
import CourseService from "./course.service"

@ApiTags("Courses")
@Controller("api/course")
export default class CourseController {
	constructor(private readonly courseService: CourseService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateRequestDto })
  @UseGuards(JwtAuthGuard)
  @Post()
	async create(@User() user: UserDto, @Body() createRequest: CreateRequestDto) {
		return await this.courseService.create(user.userId, createRequest)
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
