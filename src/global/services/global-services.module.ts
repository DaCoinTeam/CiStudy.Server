import { Global, Module } from "@nestjs/common"
import { MailerService, Sha256Service, AuthManagerService, VideoManagerService, AssetManagerService } from "./base"
import { FirebaseService } from "./3rd"
import { JwtService } from "@nestjs/jwt"
import { SessionMySqlEntity } from "@database"
import { MetamaskService } from "./blockchain"
import { TypeOrmModule } from "@nestjs/typeorm"
import Bento4Service from "./base/bento4.service"

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
		Bento4Service,
		VideoManagerService,
		AssetManagerService,

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
		Bento4Service,
		VideoManagerService,
		AssetManagerService,

		//blockchian
		MetamaskService
	],
})
export default class GlobalServicesModule {}
