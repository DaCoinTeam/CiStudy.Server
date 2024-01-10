import { Module } from "@nestjs/common"
import { UserMySqlService, mysqlProviders, userMySqlProviders } from "@database"
import AuthService from "./auth.service"
import AuthController from "./auth.controller"

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [
		AuthService,

		//mysql
		...mysqlProviders,
		...userMySqlProviders,
		UserMySqlService,
	],
})
export default class AuthModule {}
