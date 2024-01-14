import { Module } from "@nestjs/common"
import AuthService from "./auth.service"
import AuthController from "./auth.controller"
import { UserMySqlModule } from "@database"
import { JwtStrategy } from "../shared"

@Module({
	imports: [UserMySqlModule],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export default class AuthModule {}
