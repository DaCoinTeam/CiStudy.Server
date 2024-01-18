import { Global, Module } from "@nestjs/common"
import { MailerService, Sha256Service, AuthManagerService, VideoStreamerService } from "./base"
import { FirebaseService } from "./3rd"
import { JwtService } from "@nestjs/jwt"
import { SessionMySqlEntity } from "@database"
import { MetamaskService } from "./blockchain"
import { TypeOrmModule } from "@nestjs/typeorm"

@Global()
@Module({
	imports: [
		TypeOrmModule.forFeature([SessionMySqlEntity])
	],
	exports: [
		//3rd
		FirebaseService,
		//base
		Sha256Service,
		MailerService,
		AuthManagerService,
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
		AuthManagerService,
		JwtService,
		VideoStreamerService,

		//blockchian
		MetamaskService
	],
})
export default class GlobalServicesModule {}
