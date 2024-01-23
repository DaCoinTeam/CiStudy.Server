import { SectionMySqlEnitiy } from "@database"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import SectionService from "./section.service"
import { SectionController } from "./section.controller"
import { CourseRestfulModule } from "../course"

@Module({
	imports: [TypeOrmModule.forFeature([SectionMySqlEnitiy]), CourseRestfulModule],
	providers: [SectionService],
	controllers: [SectionController],
	exports: [SectionService],
})

export default class SectionModule {}