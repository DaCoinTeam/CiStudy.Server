import { UserMySqlService, UserMySqlEntity } from "@database"
import {
	BadRequestException,
	ConflictException,
	Injectable
} from "@nestjs/common"
import { SignInRequestBody, SignUpRequestBody } from "./bodies"
import { Sha256Service, MailService } from "@routes/shared"


@Injectable()
export default class UserService {
	constructor(
    private readonly UserMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
	private readonly mailService: MailService
	) {}

	async signIn(body: SignInRequestBody): Promise<UserMySqlEntity> {
		const found = await this.UserMySqlService.findByEmail(body.email)
		if (!this.sha256Service.verifyHash(body.email, found.password))
			throw new BadRequestException("Password not correct.")
		return found
	}

	async signUp(body: SignUpRequestBody) {
		const found = await this.UserMySqlService.hasEmailExisted(body.email)
		if (found)
			throw new ConflictException(`User with email ${body.email} has existed.`)
		const created = await this.UserMySqlService.create(body)

		this.mailService.sendMail(created.email)

		return created
	}
}
