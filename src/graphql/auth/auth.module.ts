import { Module } from "@nestjs/common"
import { UserMySqlModule } from "@database"

@Module({
	imports: [UserMySqlModule],
	providers: [
	],
})
export default class AuthGraphQLModule {}
