import { Module } from "@nestjs/common"
import { TokenService } from "./token.service"
import { TokenController } from "./token.controller"
import { TokensMySQLService, mysqlProviders, tokensProviders } from "@database"

@Module({
	imports: [],
	controllers: [TokenController],
	providers: [
		TokenService,

		//mysql
		...mysqlProviders,
		...tokensProviders,
		TokensMySQLService,
	],
})
export class TokenModule {}
