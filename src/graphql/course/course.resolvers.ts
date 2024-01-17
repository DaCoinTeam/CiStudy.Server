/* eslint-disable @typescript-eslint/no-unused-vars */
import { CourseMySqlService } from "@database"
import { Resolver, Query, Args } from "@nestjs/graphql"
import { Course, FindOneInput, FindOneOutput } from "./models"
import { Response } from "../shared"

@Resolver(of => Course)
export default class CourseResolvers {
	constructor(private readonly courseMySqlService: CourseMySqlService){
	}
	@Query(returns => FindOneOutput)
	async findOne(
    @Args("input") args: FindOneInput,
	) {
		const data =  await this.courseMySqlService.findById(args.courseId)
		return { data }
	}
}