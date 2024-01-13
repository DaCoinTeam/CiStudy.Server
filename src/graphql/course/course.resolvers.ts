import { CourseMySqlService } from "@database"
import { Resolver, Query, Args } from "@nestjs/graphql"
import { FindByCourseIdRequestDto } from "./dtos"

@Resolver("Course")
export default class CourseResolvers {
	constructor(private readonly courseMySqlService: CourseMySqlService){
	}
    @Query("findByCourseId")
	async findByCourseId(
    @Args("input") args: FindByCourseIdRequestDto,
	) {
		return await this.courseMySqlService.findById(args.courseId)
	}
}