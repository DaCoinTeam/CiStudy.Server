import { UserMySqlService } from "@database"
import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common"
import { SignUpDto } from "./dto"
import { UserMySqlEntity, UserKind } from "@database"
import { MailerService, Sha256Service } from "@shared"
import { FirebaseService } from "@3rd"

@Injectable()
export default class UserService {
	constructor(
    private readonly userMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
	private readonly mailerService: MailerService,
	private readonly firebaseService: FirebaseService
	) {
	}

	async signUp(params: SignUpDto) : Promise<UserMySqlEntity> {
		const found = await this.userMySqlService.hasEmailExisted(params.email)
		if (found)
			throw new ConflictException(`User with email ${params.email} has existed.`)
		params.password = this.sha256Service.createHash(params.password)
		this.mailerService.sendMail(params.email)
		return await this.userMySqlService.create(params)
	}

	async verifyGoogleAccessToken(token: string) : Promise<UserMySqlEntity> {
		const decoded = await this.firebaseService.verifyGoogleAccessToken(token)
		if (!decoded) throw new UnauthorizedException("Invalid Google access token.")
		const found = this.userMySqlService.findByExternalId(decoded.uid)
		if (!found) {
			return await this.userMySqlService.create({
				externalId: decoded.uid,
				email: decoded.email,
				avatarUrl: decoded.picture,
				phoneNumber: decoded.phone_number,
				kind: UserKind.Google
			})
		} 
		return found
	}
}
