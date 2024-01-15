import { Module } from "@nestjs/common"
import CourseService from "./course.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import CourseEntity from "./course.entity"
import EnrolledEntity from "../enrolled-info/enrolled-info.entity"

@Module({
	imports: [TypeOrmModule.forFeature([CourseEntity, EnrolledEntity])],
	providers: [CourseService],
	exports: [CourseService],
})
export default class CoursesModule {}
