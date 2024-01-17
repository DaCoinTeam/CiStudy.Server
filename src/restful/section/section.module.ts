import { Module } from "@nestjs/common"
import { SectionController } from "./section.controller"
import { SectionMysqlModule } from "@database"
import { SectionService } from "./section.service"

@Module({
	imports: [SectionMysqlModule],
	controllers: [SectionController],
	providers: [SectionService],
})

export default class SectionModule {}