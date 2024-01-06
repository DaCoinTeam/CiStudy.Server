import { UserMySqlService, UserMySqlEntity } from "@database"
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common"
import { SignInRequestBody, SignUpRequestBody } from "./bodies"
import { Sha256Service } from "@routes/shared/index"

@Injectable()
export default class UserService {
	constructor(
    private readonly UserMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
	) {}

	async signIn(body: SignInRequestBody): Promise<UserMySqlEntity> {
		const found = await this.UserMySqlService.findByEmail(body.email)
		if (!this.sha256Service.verifyHash(body.email, found.password))
			throw new BadRequestException("Password not correct")
		return found
	}

	async signUp(body: SignUpRequestBody) {
		try {
			const found = await this.UserMySqlService.findByEmail(body.email)
			console.log(found)
			throw new ConflictException(`User with email ${found.email} has existed`)
		} catch (ex) {
			if (ex instanceof NotFoundException) {
				return await this.UserMySqlService.create(body)
			}
		}
	}
}
