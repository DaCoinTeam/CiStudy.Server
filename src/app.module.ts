import { Module } from "@nestjs/common"
import { appConfig, blockchainConfig, databaseConfig, paymentConfig } from "@config"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { join } from "path"
import { AuthGraphQLModule, CourseGraphQLModule } from "@graphql"
import { AuthRestfulModule, CourseRestfulModule, PostRestfulModule } from "@restful"
import { GlobalServicesModule } from "@global"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [paymentConfig, appConfig, databaseConfig, blockchainConfig],
		}),
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: databaseConfig().mysql.username,
			password: databaseConfig().mysql.password,
			database: databaseConfig().mysql.schema,
			autoLoadEntities: true,
			synchronize: true,
			entities: ["dist/**/*.entity.ts"],
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

		
		//graphql
		AuthGraphQLModule,
		CourseGraphQLModule,

		//restful
		AuthRestfulModule,
		CourseRestfulModule,
		PostRestfulModule,

		//global
		GlobalServicesModule
	],
	controllers: [],
	providers: [
	],
})
export class AppModule {}
