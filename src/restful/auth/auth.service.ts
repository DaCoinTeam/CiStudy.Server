import { UserMySqlService } from "@database"
import { ConflictException, Injectable } from "@nestjs/common"
import { SignUpRequestDto } from "./dto"
import {
	MailerService,
	Sha256Service,
	TokenGeneratorService,
} from "src/shared/services"
import { UserDto } from "@shared"
import RefreshResponseDto from "./dto/refresh.dto"

@Injectable()
export default class AuthService {
	constructor(
    private readonly userMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
    private readonly mailerService: MailerService,
    private readonly tokenGeneratorService: TokenGeneratorService,
	) {}

	refresh(params: UserDto): RefreshResponseDto {
		return this.tokenGeneratorService.generateAuthTokens(params)
	}

	async signUp(params: SignUpRequestDto): Promise<string> {
		const found = await this.userMySqlService.findByEmail(params.email)
		if (found)
			throw new ConflictException(
				`User with email ${params.email} has existed.`,
			)
		params.password = this.sha256Service.createHash(params.password)
		await this.userMySqlService.create(params)

		this.mailerService.sendMail(params.email)
		return (
			"Sign up successfully. An email has been sent to " +
      params.email +
      " for verification."
		)
	}
}
