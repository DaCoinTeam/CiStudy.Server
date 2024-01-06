import { UserMySqlService, UserMySqlEntity } from "@database"
import {
	BadRequestException,
	ConflictException,
	Injectable
} from "@nestjs/common"
import { SignInDto, SignUpDto } from "./dtos"
import { Sha256Service, MailService } from "@routes/shared"


@Injectable()
export default class UserService {
	constructor(
    private readonly UserMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
	private readonly mailService: MailService
	) {}

	async signIn(params: SignInDto): Promise<UserMySqlEntity> {
		const found = await this.UserMySqlService.findByEmail(params.email)
		if (!this.sha256Service.verifyHash(params.email, found.password))
			throw new BadRequestException("Password not correct.")
		return found
	}

	async signUp(params: SignUpDto) {
		const found = await this.UserMySqlService.hasEmailExisted(params.email)
		if (found)
			throw new ConflictException(`User with email ${params.email} has existed.`)
		const created = await this.UserMySqlService.create(params)

		await this.mailService.sendMail(created.email)

		return created
	}
}
