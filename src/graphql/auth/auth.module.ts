import { Module } from "@nestjs/common"
import UserResolvers from "./auth.resolvers"
import { Sha256Service, TokenGeneratorService } from "src/shared/services"
import {
	UserMySqlService,
	mysqlProviders,
	userMySqlProviders,
} from "@database"
import { FirebaseService } from "@3rd"
import { JwtService } from "@nestjs/jwt"
import { JwtStrategy } from "@shared"

@Module({
	providers: [
		UserResolvers,
		Sha256Service,
		FirebaseService,
		TokenGeneratorService,
		JwtService,

		//strategies
		JwtStrategy,

		//mysql
		...mysqlProviders,
		...userMySqlProviders,
		UserMySqlService,
	],
	imports: [],
})
export default class AuthGraphQLModule {}
