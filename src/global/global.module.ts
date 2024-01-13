import { Global, Module } from "@nestjs/common"
import { MailerService, Sha256Service, TokenManagerService } from "./base"
import { FirebaseService } from "./3rd"
import { JwtService } from "@nestjs/jwt"
import { RefreshMySqlModule } from "@database"

@Global()
@Module({
	imports: [
		RefreshMySqlModule
	],
	exports: [
		//3rd
		FirebaseService,
		//base
		Sha256Service,
		MailerService,
		TokenManagerService,
		JwtService,
	],
	providers: [
		//3rd
		FirebaseService,
		//base
		Sha256Service,
		MailerService,
		TokenManagerService,
		JwtService,
	],
})
export default class GlobalModule {}
