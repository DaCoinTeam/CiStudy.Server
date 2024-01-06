import { Module } from "@nestjs/common"
import { UserMySqlService, mysqlProviders, userMySqlProviders } from "@database"
import UserService from "./user.service"
import UserController from "./user.controller"
import { MailService, Sha256Service } from "@routes/shared"
import { JwtService } from "@nestjs/jwt"

@Module({
	imports: [],
	controllers: [UserController],
	providers: [
		UserService,
		Sha256Service,
		MailService,
		JwtService,

		//mysql
		...mysqlProviders,
		...userMySqlProviders,
		UserMySqlService,
	],
})
export default class UserModule {}
