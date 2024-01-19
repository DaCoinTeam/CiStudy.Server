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
  AuthManagerService,
} from "@global"
import { UserMySqlEntity } from "@database"
import { UserKind } from "./dto/verify-google-access-token"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(UserMySqlEntity)
    private readonly userMySqlRepository: Repository<UserMySqlEntity>,
    private readonly sha256Service: Sha256Service,
    private readonly mailerService: MailerService,
    private readonly authManagerService: AuthManagerService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async signUp(body: SignUpRequestDto): Promise<string> {
    const found = await this.userMySqlRepository.findOne({
      where: {
        email: body.email,
      },
    })
    if (found)
      throw new ConflictException(`User with email ${body.email} has existed.`)
    body.password = this.sha256Service.createHash(body.password)
    const created = await this.userMySqlRepository.save(body)

    await this.mailerService.sendMail(created.userId, body.email)
    return `An user with id ${created.userId} has been created`
  }

  async signIn(body: SignInRequestDto): Promise<SignInResponseDto> {
    const found = await this.userMySqlRepository.findOneBy({
      email: body.email,
    })
    if (!found) throw new NotFoundException("User not found.")
    if (!this.sha256Service.verifyHash(body.password, found.password))
      throw new UnauthorizedException("Invalid credentials.")
    return found
  }

  async init(user: UserMySqlEntity): Promise<InitResponseDto> {
    return user
  }

  async verifyGoogleAccessToken({
    token,
  }: VerifyGoogleAccessTokenRequestDto): Promise<VerifyGoogleAccessTokenResponseDto> {
    const decoded = await this.firebaseService.verifyGoogleAccessToken(token)
    if (!decoded)
      throw new UnauthorizedException("Invalid Google access token.")
    let found = await this.userMySqlRepository.findOneBy({
      externalId: decoded.uid,
    })
    if (!found) {
      found = await this.userMySqlRepository.save({
        externalId: decoded.uid,
        email: decoded.email,
        avatarUrl: decoded.picture,
        phoneNumber: decoded.phone_number,
        kind: UserKind.Google,
      })
    }
    return found
  }

  async verifyRegistration({ token }: VerifyRegistrationRequestDto) {
    const decoded = await this.authManagerService.verifyToken(token)
    const userId = decoded.userId
    if (!userId) throw new NotFoundException("User not found.")

    const updatedResult = await this.userMySqlRepository.update(userId, {
      verified: true,
    })

    if (!updatedResult.affected)
      throw new NotFoundException("Cannot verify user.")
  }
}
