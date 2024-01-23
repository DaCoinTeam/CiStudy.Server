/* eslint-disable @typescript-eslint/no-unused-vars */
import { CourseMySqlEntity } from "@database"
import { Resolver, Query, Args } from "@nestjs/graphql"
import { FindOneCourseInput, FindManyCoursesInput } from "./models"
import { CourseModel } from "../shared"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Resolver(() => CourseModel)
export default class CourseResolvers {
	constructor(
    @InjectRepository(CourseMySqlEntity)
    private readonly courseMySqlRepository: Repository<CourseMySqlEntity>,
	) {}
  @Query(() => CourseModel)
	async findOneCourse(@Args("input") args: FindOneCourseInput) {
		return await this.courseMySqlRepository.findOneBy({
			courseId: args.courseId,
		})
	}

	@Query(() => [CourseModel])
	async findManyCourses(@Args("input", { nullable: true }) args: FindManyCoursesInput) {
		const founds = await this.courseMySqlRepository.findAndCount({
			relations: {
				creator: true
			}
		})
		console.dir(founds, { depth: null})
		return founds[0]
	}
}
