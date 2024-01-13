import { CourseMySqlService } from "@database"
import { Resolver, Query, Args } from "@nestjs/graphql"

@Resolver("Course")
export default class CourseResolvers {
	constructor(private readonly courseMySqlService: CourseMySqlService){
	}
    @Query("findById")
	async findById(
    @Args("input") courseId: string,
	) {
		console.log(await this.courseMySqlService.findById(courseId))
		return await this.courseMySqlService.findById(courseId)
	}
}