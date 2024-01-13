import { Module } from "@nestjs/common"
import AuthService from "./auth.service"
import AuthController from "./auth.controller"
import { UserMySqlModule } from "@database"

@Module({
	imports: [UserMySqlModule,],
	controllers: [AuthController],
	providers: [AuthService],
})
export default class AuthModule {}
