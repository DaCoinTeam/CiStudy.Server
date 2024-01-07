import { UserMySqlService } from "@database"
import {
	ConflictException,
	Injectable,
} from "@nestjs/common"
import { SignUpDto } from "./dto"
import { MailerService, Sha256Service } from "@shared"

@Injectable()
export default class UserService {
	constructor(
    private readonly userMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
	private readonly mailerService: MailerService
	) {
	}

	async signUp(params: SignUpDto) {
		const found = await this.userMySqlService.hasEmailExisted(params.email)
		if (found)
			throw new ConflictException(`User with email ${params.email} has existed.`)
		params.password = this.sha256Service.createHash(params.password)
		this.mailerService.sendMail(params.email)
		return await this.userMySqlService.create(params)
	}

	// async verifyGoogleAccessToken(token: string) {
	// 	getAuth()
	// 		.verifyIdToken(idToken)
	// 		.then((decodedToken) => {
	// 			const uid = decodedToken.uid
	// 			// ...
	// 		})
	// 		.catch((error) => {
	// 			// Handle error
	// 		})
	// }
}
