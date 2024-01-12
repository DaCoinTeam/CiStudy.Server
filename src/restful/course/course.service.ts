import { CourseMySqlService } from "@database"
import { Injectable } from "@nestjs/common"
import { CreateReponseDto, CreateRequestDto } from "./dto"
import { UserDto } from "@shared"

@Injectable()
export default class CourseService {
	constructor(private readonly courseMySqlService: CourseMySqlService) {}

	async create(
		user: UserDto,
		body: CreateRequestDto,
	): Promise<CreateReponseDto> {
		body.creatorId = user.userId
		return this.courseMySqlService.create(body)
	}

	async findById(courseId: string): Promise<CreateReponseDto> {
		return await this.courseMySqlService.findById(courseId)
	}

	async findAll(): Promise<CreateReponseDto[]> {
		return await this.courseMySqlService.findAll()
	}

	async delete(courseId: string) {
		return await this.courseMySqlService.delete(courseId)
	}
}
