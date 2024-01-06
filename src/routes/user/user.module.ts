import { Module } from "@nestjs/common"
import { UserMySqlService, UserMySqlProviders } from "@database"
import UserService from "./user.service"
import UserController from "./user.controller"
import { Sha256Service } from "@routes/shared"

@Module({
	imports: [],
	controllers: [UserController],
	providers: [
		UserService,
		Sha256Service,

		//mysql
		...UserMySqlProviders,
		UserMySqlService,
	],
})
export default class UserModule {}
