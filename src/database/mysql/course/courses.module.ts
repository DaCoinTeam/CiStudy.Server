import { Module } from "@nestjs/common"
import { CoursesController } from "../../../restful/courses/courses.controller"
import CoursesService from "./courses.service"

@Module({
	controllers: [CoursesController],
	providers: [CoursesService],
})
export default class CoursesModule {}
