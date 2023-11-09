import { Module } from "@nestjs/common"
import { appConfig, paymentConfig } from "@config"
import { ConfigModule } from "@nestjs/config"
import { PaymentModule } from "@routes/payment/payment.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [
				paymentConfig,
				appConfig
			]}),
		PaymentModule
	],
	controllers: [],
	providers: [],
})

export class AppModule {}

