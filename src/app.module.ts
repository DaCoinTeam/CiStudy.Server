import { Module } from "@nestjs/common"
import { appConfig, paymentConfig } from "@config"
import { ConfigModule } from "@nestjs/config"
import { MySQLModule } from "@database"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { join } from "path"
import { UserGraphQLModule } from "@graphql"


@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			typePaths: ["./**/*.graphql"],
			installSubscriptionHandlers: true,
			definitions: {
				path: join(process.cwd(), "src/graphql.schema.ts"),
				outputAs: "class",
			  },
		  }),
		ConfigModule.forRoot({
			load: [
				paymentConfig,
				appConfig
			]}),

		//graphql
		UserGraphQLModule,
	
		//mysql
		MySQLModule
	],
	controllers: [],
	providers: [],
})

export class AppModule {}

