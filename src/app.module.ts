import { Module } from "@nestjs/common"
import { appConfig, databaseConfig, paymentConfig } from "@config"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { join } from "path"
import { AuthGraphQLModule, CourseGraphQLModule } from "@graphql"
import { AuthRestfulModule, CourseRestfulModule } from "@restful"
import { GlobalModule } from "@global"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [paymentConfig, appConfig, databaseConfig],
		}),
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "26.78.227.119",
			port: 3306,
			username: databaseConfig().mysql.username,
			password: databaseConfig().mysql.password,
			database: databaseConfig().mysql.schema,
			autoLoadEntities: true,
			synchronize: true,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			typePaths: ["./**/*.graphql"],
			installSubscriptionHandlers: true,
			definitions: {
				path: join(process.cwd(), "src/graphql.schema.ts"),
				outputAs: "class",
			},
		}),

		//try place db
		

		//graphql
		AuthGraphQLModule,
		CourseGraphQLModule,

		//restful
		//AuthRestfulModule,
		//CourseRestfulModule,

		//global
		GlobalModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
