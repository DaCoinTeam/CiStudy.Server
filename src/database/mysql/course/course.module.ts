import { Module } from "@nestjs/common"
import CourseService from "./course.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import CourseEntity from "./course.entity"

@Module({
	imports: [TypeOrmModule.forFeature([CourseEntity])],
	providers: [CourseService],
	exports: [CourseService],
})
export default class CoursesModule {}
