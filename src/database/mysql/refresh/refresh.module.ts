import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import RefreshEntity from "./refresh.entity"
import RefreshService from "./refresh.service"

@Module({
	imports: [TypeOrmModule.forFeature([RefreshEntity])],
	providers: [RefreshService],
	exports: [RefreshService],
})
export default class RefreshModule {}
