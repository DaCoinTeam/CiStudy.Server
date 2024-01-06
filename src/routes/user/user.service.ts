import { UserMySqlService, UserMySqlEntity } from "@database"
import {
	BadRequestException,
	ConflictException,
	Injectable
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
		const found = await this.UserMySqlService.hasEmailExisted(body.email)
		if (found)
			throw new ConflictException(`User with email ${body.email} has existed`)
		return await this.UserMySqlService.create(body)
	}
}
