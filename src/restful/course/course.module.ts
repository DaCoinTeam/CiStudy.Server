import { CourseMySqlModule } from "@database"
import { Module } from "@nestjs/common"
import CourseController from "./course.controller"
import CourseService from "./course.service"

@Module({
	imports: [CourseMySqlModule],
	controllers: [CourseController],
	providers: [CourseService],
})
export default class CourseModule {
}
