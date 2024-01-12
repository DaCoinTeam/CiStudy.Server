import { CourseMysqlService } from "@database"
import { Injectable } from "@nestjs/common"
import {  CreateRequestDto } from "./dto"
import { CourseDto } from "@shared"

@Injectable()
export default class CourseService {
	constructor(private readonly courseMySqlService: CourseMysqlService) {}

	async create(userId: string, createRequest: CreateRequestDto): Promise<CourseDto> {
		createRequest.creatorId = userId
		return this.courseMySqlService.create(createRequest)
	}
}