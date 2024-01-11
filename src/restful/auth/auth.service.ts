import { UserMySqlService } from "@database"
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { SignUpRequestDto } from "./dto"
import {
	MailerService,
	Sha256Service,
	TokenGeneratorService,
} from "@global"
import { UserDto } from "@shared"
import RefreshResponseDto from "./dto/refresh.dto"
import { JwtService } from "@nestjs/jwt"
import { jwtConfig } from "@config"

@Injectable()
export default class AuthService {
	constructor(
    private readonly userMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
    private readonly mailerService: MailerService,
    private readonly tokenGeneratorService: TokenGeneratorService,
	private readonly jwtService: JwtService
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
		const created = await this.userMySqlService.create(params)

		this.mailerService.sendMail(created)
		return (
			"Sign up successfully. An email has been sent to " +
      params.email +
      " for verification."
		)
	}

	async verifyRegistration(token: string) : Promise<string> {
		let decoded : UserDto
		try{
			decoded = this.jwtService.verify<UserDto>(token, {
				secret: jwtConfig().secret
			})
		}
		catch(ex){
			throw new UnauthorizedException("Invalid token.")
		}
		const userId = decoded.userId
		if (!userId) throw new NotFoundException("User not found.")

		const updated = await this.userMySqlService.update({
			userId,
			verified: true
		})

		if (!updated) throw new NotFoundException("Cannot verify user.")

		return "Verify user successfully."
	}
}
