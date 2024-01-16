import { Global, Module } from "@nestjs/common"
import { MailerService, Sha256Service, TokenManagerService, VideoStreamerService } from "./base"
import { FirebaseService } from "./3rd"
import { JwtService } from "@nestjs/jwt"
import { SessionMySqlModule } from "@database"
import { MetamaskService } from "./blockchain"

@Global()
@Module({
	imports: [
		SessionMySqlModule
	],
	exports: [
		//3rd
		FirebaseService,
		//base
		Sha256Service,
		MailerService,
		TokenManagerService,
		JwtService,
		VideoStreamerService,

		//blockchain
		MetamaskService
	],
	providers: [
		//3rd
		FirebaseService,
		//base
		Sha256Service,
		MailerService,
		TokenManagerService,
		JwtService,
		VideoStreamerService,

		//blockchian
		MetamaskService
	],
})
export default class GlobalServicesModule {}
