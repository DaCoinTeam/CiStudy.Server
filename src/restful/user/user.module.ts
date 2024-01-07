import { Module } from "@nestjs/common"
import { UserMySqlService, mysqlProviders, userMySqlProviders } from "@database"
import UserService from "./user.service"
import UserController from "./user.controller"
import { Sha256Service } from "@shared"

@Module({
	imports: [],
	controllers: [UserController],
	providers: [
		UserService,
		Sha256Service,

		//mysql
		...mysqlProviders,
		...userMySqlProviders,
		UserMySqlService,
	],
})
export default class UserRestfulModule {}
