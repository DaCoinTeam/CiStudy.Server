import { Module } from "@nestjs/common"
import { appConfig, paymentConfig } from "@config"
import { ConfigModule } from "@nestjs/config"
import { UserMySqlModule } from "@database"
import { UserModule } from "@routes/user"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"


@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
		  }),
		ConfigModule.forRoot({
			load: [
				paymentConfig,
				appConfig
			]}),

		//controllers
		UserModule,

		//mysql
		UserMySqlModule
	],
	controllers: [],
	providers: [],
})

export class AppModule {}

