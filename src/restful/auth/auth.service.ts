// import { UserMySqlService } from "@database"
import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common"
import {
	InitResponseDto,
	SignInRequestDto,
	SignInResponseDto,
	SignUpRequestDto,
	VerifyGoogleAccessTokenRequestDto,
	VerifyGoogleAccessTokenResponseDto,
	VerifyRegistrationRequestDto,
} from "./dto"
import {
	FirebaseService,
	MailerService,
	Sha256Service,
	TokenManagerService,
} from "@global"
import { UserMySqlService } from "@database"
import { UserMySqlDto } from "@shared"
import { UserKind } from "./dto/verify-google-access-token"

@Injectable()
export default class AuthService {
	constructor(
    private readonly userMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
    private readonly mailerService: MailerService,
    private readonly tokenManagerService: TokenManagerService,
    private readonly firebaseService: FirebaseService,
	) {}

	async signUp(body: SignUpRequestDto): Promise<string> {
		const found = await this.userMySqlService.findByEmail(body.email)
		if (found)
			throw new ConflictException(
				`User with email ${body.email} has existed.`,
			)
		body.password = this.sha256Service.createHash(body.password)
		const created = await this.userMySqlService.create(body)

		await this.mailerService.sendMail(created.userId, body.email)
		return `An user with id ${created.userId} has been created`  
	}

	async signIn(body: SignInRequestDto): Promise<SignInResponseDto> {
		const found = await this.userMySqlService.findByEmail(body.email)
		if (!found) throw new NotFoundException("User not found.")
		if (!this.sha256Service.verifyHash(body.password, found.password))
			throw new UnauthorizedException("Invalid credentials.")
		return found
	}

	async init(user: UserMySqlDto): Promise<InitResponseDto> {
		return user
	}

	async verifyGoogleAccessToken({
		token,
	}: VerifyGoogleAccessTokenRequestDto): Promise<VerifyGoogleAccessTokenResponseDto> {
		const decoded = await this.firebaseService.verifyGoogleAccessToken(token)
		if (!decoded)
			throw new UnauthorizedException("Invalid Google access token.")

		let found = await this.userMySqlService.findByExternalId(decoded.uid)
		if (!found) {
			found = await this.userMySqlService.create({
				externalId: decoded.uid,
				email: decoded.email,
				avatarUrl: decoded.picture,
				phoneNumber: decoded.phone_number,
				kind: UserKind.Google,
			})
		}
		return found
	}

	async verifyRegistration({
		token,
	}: VerifyRegistrationRequestDto) {
		const decoded = await this.tokenManagerService.verifyToken(token)
		const userId = decoded.userId
		if (!userId) throw new NotFoundException("User not found.")

		const updated = await this.userMySqlService.update({
			userId,
			verified: true,
		})

		if (!updated) throw new NotFoundException("Cannot verify user.")
	}
}
