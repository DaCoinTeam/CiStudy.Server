import { Module } from "@nestjs/common"
import CourseController from "./course.controller"
import CourseService from "./course.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { EnrolledInfoMySqlEntity, CourseMySqlEntity } from "@database"

@Module({
	imports: [
		TypeOrmModule.forFeature([CourseMySqlEntity, EnrolledInfoMySqlEntity]),
	],
	controllers: [CourseController],
	providers: [CourseService],
	exports: [CourseService]
})
export default class CourseModule {}
