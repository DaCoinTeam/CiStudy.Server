import { Module } from "@nestjs/common"
import { UserMySqlEntity } from "@database"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
	imports: [TypeOrmModule.forFeature([UserMySqlEntity])],
	providers: [
	],
})
export default class AuthGraphQLModule {}
