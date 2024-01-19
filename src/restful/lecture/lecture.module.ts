import { Module } from "@nestjs/common"
import LectureService from "./lecture.service"
import LectureController from "./lecture.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LectureMysqlEntity } from "@database"

@Module({
	imports: [TypeOrmModule.forFeature([LectureMysqlEntity])],
	controllers: [LectureController],
	providers: [LectureService],
})

export default class LectureModule {}
