import { Module } from "@nestjs/common"
import { appConfig, paymentConfig } from "@config"
import { ConfigModule } from "@nestjs/config"
import { PaymentModule } from "@routes/payment/payment.module"
import { TokensMySQLModule } from "@database"
import { TokenModule } from "@routes/token/token.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [
				paymentConfig,
				appConfig
			]}),

		//controllers
		PaymentModule,
		TokenModule,

		//mysql
		TokensMySQLModule
	],
	controllers: [],
	providers: [],
})

export class AppModule {}

