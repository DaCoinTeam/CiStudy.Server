import { Global, Module } from "@nestjs/common"
import { MailerService, Sha256Service, TokenGeneratorService } from "./base"
import { FirebaseService } from "./3rd"
import { JwtService } from "@nestjs/jwt"

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
	],
	providers: [
		//3rd
		FirebaseService,
		//base
		Sha256Service,
		MailerService,
		TokenGeneratorService,
		JwtService,
	],
})
export default class GlobalModule {}
