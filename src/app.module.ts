import { Module } from "@nestjs/common"
import { appConfig, paymentConfig } from "@config"
import { ConfigModule } from "@nestjs/config"
import { UserMySqlModule } from "@database"
import { UserModule } from "@routes/user"

@Module({
	imports: [
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

