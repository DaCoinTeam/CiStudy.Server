import { Module } from "@nestjs/common"
import LectureService from "./lecture.service"
import LectureController from "./lecture.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LectureMysqlEntity } from "@database"
import { SectionRestfulModule } from "../section"

@Module({
	imports: [TypeOrmModule.forFeature([LectureMysqlEntity]), SectionRestfulModule],
	controllers: [LectureController],
	providers: [LectureService],
	exports: [LectureService],
})

export default class LectureModule {}
