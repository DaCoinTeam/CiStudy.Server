/* eslint-disable @typescript-eslint/no-unused-vars */
import { CourseMySqlService } from "@database"
import { Resolver, Query, Args } from "@nestjs/graphql"
import { FindOneInput } from "./models"
import { Course } from "../shared"

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