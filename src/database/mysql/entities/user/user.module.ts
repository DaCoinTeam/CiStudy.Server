import { Module } from "@nestjs/common"
import MySQLModule from "../../mysql.module"
import userProvider from "./user.providers"
import UserService from "./user.service"

@Module({
	imports: [MySQLModule],
	providers: [
		...userProvider,
		UserService,
	],
})
export default class UsersModule {}