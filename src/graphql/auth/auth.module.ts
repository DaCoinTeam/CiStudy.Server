import { Module } from "@nestjs/common"
import UserResolvers from "./auth.resolvers"
import { Sha256Service } from "@shared"
import {
	UserMySqlService,
	mysqlProviders,
	userMySqlProviders,
} from "@database"
import { FirebaseService } from "@3rd"

@Module({
	providers: [
		UserResolvers,
		Sha256Service,
		FirebaseService,

		//mysql
		...mysqlProviders,
		...userMySqlProviders,
		UserMySqlService,
	],
	imports: [],
})
export default class AuthGraphQLModule {}
