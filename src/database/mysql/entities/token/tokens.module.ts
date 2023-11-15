import { Module } from "@nestjs/common"
import MySQLModule from "../../mysql.module"
import tokensProviders from "./tokens.providers"
import TokensService from "./tokens.service"

@Module({
	imports: [MySQLModule],
	providers: [
		...tokensProviders,
		TokensService,
	],
})
export default class TokensModule {}