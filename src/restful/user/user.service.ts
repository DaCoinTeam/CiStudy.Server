import { UserMySqlService } from "@database"
import {
	ConflictException,
	Injectable,
} from "@nestjs/common"
import { SignUpDto } from "./dto"
import { Sha256Service } from "@shared"

@Injectable()
export default class UserService {
	constructor(
    private readonly userMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
	) {}

	async signUp(body: SignUpDto) {
		const found = await this.userMySqlService.hasEmailExisted(body.email)
		if (found)
			throw new ConflictException(`User with email ${body.email} has existed.`)
		body.password = this.sha256Service.createHash(body.password)
		return await this.userMySqlService.create(body)
	}
}
