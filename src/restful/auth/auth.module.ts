import { Module } from "@nestjs/common"
import { UserMySqlService, mysqlProviders, userMySqlProviders } from "@database"
import AuthService from "./auth.service"
import AuthController from "./auth.controller"
import { MailerService, Sha256Service } from "@shared"
import { JwtService } from "@nestjs/jwt"

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [
		AuthService,
		Sha256Service,
		MailerService,
		JwtService,

		//mysql
		...mysqlProviders,
		...userMySqlProviders,
		UserMySqlService,
	],
})
export default class AuthModule {}
