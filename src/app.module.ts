import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common"
import {
	appConfig,
	blockchainConfig,
	databaseConfig,
	paymentConfig,
} from "@config"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { join } from "path"
import { AuthGraphQLModule, CourseGraphQLModule } from "@graphql"
import {
	AuthRestfulModule,
	CourseRestfulModule,
	PostRestfulModule,
} from "@restful"
import {
	SetBearerTokenMiddleware,
	AttachCourseIdMiddleware,
	GlobalServicesModule,
} from "@global"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [paymentConfig, appConfig, databaseConfig, blockchainConfig],
		}),
		TypeOrmModule.forRoot({
			type: "mysql",
			host: databaseConfig().mysql.host,
			port: +databaseConfig().mysql.port,
			username: databaseConfig().mysql.username,
			password: databaseConfig().mysql.password,
			database: databaseConfig().mysql.schema,
			autoLoadEntities: true,
			synchronize: true,
			entities: ["dist/**/*.entity.ts"],
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), "src/schema.gql"),
			sortSchema: true,
		}),

		//graphql
		AuthGraphQLModule,
		CourseGraphQLModule,

		//restful
		AuthRestfulModule,
		CourseRestfulModule,
		PostRestfulModule,

		//global
		GlobalServicesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(SetBearerTokenMiddleware).forRoutes()
		consumer
			.apply(SetBearerTokenMiddleware, AttachCourseIdMiddleware)
			.forRoutes({
				path: "api/course/stream-preview",
				method: RequestMethod.GET,
			})
	}
}
