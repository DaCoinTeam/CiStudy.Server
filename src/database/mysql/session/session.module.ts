import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import RefreshEntity from "./session.entity"
import RefreshService from "./session.service"

@Module({
	imports: [TypeOrmModule.forFeature([RefreshEntity])],
	providers: [RefreshService],
	exports: [RefreshService],
})
export default class SessionModule {}
