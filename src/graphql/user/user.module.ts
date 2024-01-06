import { Module } from "@nestjs/common"
import UserResolvers from "./user.resolvers"
import { Sha256Service } from "@shared"
import {
	UserMySqlService,
	mysqlProviders,
	userMySqlProviders,
} from "@database"

@Module({
	providers: [
		UserResolvers,
		Sha256Service,

		//mysql
		...mysqlProviders,
		...userMySqlProviders,
		UserMySqlService,
	],
	imports: [],
})
export default class UserGraphQLModule {}
