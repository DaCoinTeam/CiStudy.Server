import { CourseMySqlService } from "@database"
import { Injectable } from "@nestjs/common"
import { CreateReponseDto, CreateRequestDto } from "./dto"
import { UserPayload } from "@shared"

@Injectable()
export default class CourseService {
	constructor(private readonly courseMySqlService: CourseMySqlService) {}

	async create(
		user: UserPayload,
		body: CreateRequestDto,
	): Promise<CreateReponseDto> {
		body.creatorId = user.userId
		return this.courseMySqlService.create(body)
	}
}
