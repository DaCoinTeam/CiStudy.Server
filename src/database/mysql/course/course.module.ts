import { Module } from "@nestjs/common"
import CoursesService from "./course.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import CourseEntity from "./course.entity"

@Module({
	imports: [TypeOrmModule.forFeature([CourseEntity])],
	providers: [CoursesService],
	exports: [CoursesService],
})
export default class CoursesModule {}
