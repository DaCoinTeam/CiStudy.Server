import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import SectionService from "./section.service"
import SectionEntity from "./section.entity"

@Module({
	imports: [TypeOrmModule.forFeature([SectionEntity])],
	providers: [SectionService],
	exports: [SectionService],
})
export default class SectionModule {}
