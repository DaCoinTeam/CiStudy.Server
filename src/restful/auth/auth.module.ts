import { Module } from "@nestjs/common"
import { UserMySqlService, mysqlProviders, userMySqlProviders } from "@database"
import AuthService from "./auth.service"
import AuthController from "./auth.controller"
import { MailerService, Sha256Service, TokenGeneratorService } from "src/shared/services"
import { JwtService } from "@nestjs/jwt"

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [
		AuthService,
		Sha256Service,
		MailerService,
		JwtService,
		TokenGeneratorService,

		//mysql
		...mysqlProviders,
		...userMySqlProviders,
		UserMySqlService,
	],
})
export default class AuthModule {}
