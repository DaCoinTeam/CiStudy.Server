/* eslint-disable @typescript-eslint/no-unused-vars */
import { CourseMySqlService } from "@database"
import { Resolver, Query, Args } from "@nestjs/graphql"
import { Course, FindOneInput, FindOneOutput } from "./models"

@Resolver(of => Course)
export default class CourseResolvers {
	constructor(private readonly courseMySqlService: CourseMySqlService){
	}
	@Query(returns => Course)
	async findOne(
    @Args("input") args: FindOneInput,
	) {
		return await this.courseMySqlService.findById(args.courseId)
	}
}