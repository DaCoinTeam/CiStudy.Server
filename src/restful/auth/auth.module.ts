import { Module } from "@nestjs/common"
import AuthService from "./auth.service"
import AuthController from "./auth.controller"
import { UserMySqlEntity } from "@database"
import { JwtStrategy } from "@shared"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
	imports: [TypeOrmModule.forFeature([UserMySqlEntity])],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export default class AuthModule {}
