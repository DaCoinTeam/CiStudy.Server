import { Module } from "@nestjs/common"
import UserResolvers from "./auth.resolvers"

import {
	UserMySqlService,
	mysqlProviders,
	userMySqlProviders,
} from "@database"

import { JwtStrategy } from "../shared"

@Module({
	providers: [ 
		UserResolvers,

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
