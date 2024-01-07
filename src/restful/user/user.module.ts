import { Module } from "@nestjs/common"
import { UserMySqlService, mysqlProviders, userMySqlProviders } from "@database"
import UserService from "./user.service"
import UserController from "./user.controller"
import { MailerService, Sha256Service } from "@shared"
import { JwtService } from "@nestjs/jwt"
import { FirebaseService } from "@3rd"

@Module({
	imports: [],
	controllers: [UserController],
	providers: [
		UserService,
		Sha256Service,
		MailerService,
		JwtService,
		FirebaseService,

		//mysql
		...mysqlProviders,
		...userMySqlProviders,
		UserMySqlService,
	],
})
export default class UserRestfulModule {}
