import { Module } from "@nestjs/common"
import { appConfig, paymentConfig } from "@config"
import { ConfigModule } from "@nestjs/config"
import { MySQLModule } from "@database"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { join } from "path"
import { UserGraphQLModule } from "@graphql"
import { UserRestfulModule } from "@restful"
import FirebaseService from "./3rd/firebase"
import { JwtService } from "@nestjs/jwt"

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
			load: [paymentConfig, appConfig],
		}),

		//graphql
		UserGraphQLModule,

		//restful
		UserRestfulModule,
		
		//mysql
		MySQLModule,

		//3rd
		FirebaseService
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
