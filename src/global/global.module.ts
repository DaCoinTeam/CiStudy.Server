import { Global, Module } from "@nestjs/common"
import { MailerService, Sha256Service, TokenGeneratorService } from "./base"
import { FirebaseService } from "./3rd"
import { JwtService } from "@nestjs/jwt"
import { MetamaskService } from "./blockchain"

@Global()
@Module({
	exports: [
		//3rd
		FirebaseService,
		//base
		Sha256Service,
		MailerService,
		TokenGeneratorService,
		JwtService,

		//blockchain
		MetamaskService
	],
	providers: [
		//3rd
		FirebaseService,
		//base
		Sha256Service,
		MailerService,
		TokenGeneratorService,
		JwtService,

		//blockchian
		MetamaskService
	],
})
export default class GlobalModule {}
