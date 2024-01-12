import { CourseMySqlService } from "@database"
import { Injectable } from "@nestjs/common"
import { CreateReponseDto, CreateRequestDto } from "./dto"

@Injectable()
export default class CourseService {
	constructor(private readonly courseMySqlService: CourseMySqlService) {}

	async create(
		userId: string,
		params: CreateRequestDto,
	): Promise<CreateReponseDto> {
		params.creatorId = userId
		return this.courseMySqlService.create(params)
	}
}
