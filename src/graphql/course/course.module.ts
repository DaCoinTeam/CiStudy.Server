import { Module } from "@nestjs/common"
import { CourseMySqlEntity } from "@database"
import CourseResolvers from "./course.resolvers"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
	imports: [TypeOrmModule.forFeature([CourseMySqlEntity])],
	providers: [
		CourseResolvers
	],
})
export default class CourseGraphQLModule {}
