import { Module } from "@nestjs/common"
import { CourseMySqlModule } from "@database"
import CourseResolvers from "./course.resolvers"

@Module({
	imports: [CourseMySqlModule],
	providers: [
		CourseResolvers
	],
})
export default class CourseGraphQLModule {}
