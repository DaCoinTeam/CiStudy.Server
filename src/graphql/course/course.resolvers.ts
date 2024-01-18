/* eslint-disable @typescript-eslint/no-unused-vars */
import { CourseMySqlEntity } from "@database"
import { Resolver, Query, Args } from "@nestjs/graphql"
import { FindOneInput } from "./models"
import { CourseModel } from "../shared"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Resolver((of) => CourseModel)
export default class CourseResolvers {
	constructor(
    @InjectRepository(CourseMySqlEntity)
    private readonly courseMySqlRepository: Repository<CourseMySqlEntity>,
	) {}
  @Query((returns) => CourseModel)
	async findOne(@Args("input") args: FindOneInput) {
		return await this.courseMySqlRepository.findOneBy({
			courseId: args.courseId,
		})
	}
}
