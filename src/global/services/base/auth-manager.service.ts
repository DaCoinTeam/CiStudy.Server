import { jwtConfig } from "@config"
import { SessionMySqlEntity } from "@database"
import {
	Injectable,
	UnauthorizedException,
} from "@nestjs/common"
import { JsonWebTokenError, JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Payload, TokenType } from "@shared"
import { Repository } from "typeorm"

@Injectable()
export default class AuthManagerService {
	constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(SessionMySqlEntity)
    private readonly sessionMySqlRepository: Repository<SessionMySqlEntity>,
	) {}

	async verifyToken(token: string): Promise<Payload> {
		try {
			return await this.jwtService.verifyAsync<Payload>(token)
		} catch (ex) {
			if (ex instanceof JsonWebTokenError) {
				throw new UnauthorizedException("Invalid token.")
			}
		}
	}

	async getTokenType(token: string): Promise<TokenType> {
		const { type } = await this.verifyToken(token)
		return type
	}

	async validateSession(userId: string, clientId: string): Promise<void> {
		const session = await this.sessionMySqlRepository.findOneBy({
			userId,
			clientId,
		})
		if (session === null) throw new UnauthorizedException("Session not found.")
		if (session.isDisabled)
			throw new UnauthorizedException("Session is disabled.")
	}

	private async generateToken<T extends PayloadLike>(
		data: T,
		type: TokenType = TokenType.Access,
	) {
		const typeToExpiresIn: Record<TokenType, string> = {
			[TokenType.Access]: jwtConfig().accessTokenExpiryTime,
			[TokenType.Refresh]: jwtConfig().refreshTokenExpiryTime,
			[TokenType.Verify]: jwtConfig().verifyTokenExpiryTime,
		}
		const expiresIn = typeToExpiresIn[type]

		return await this.jwtService.signAsync(
			{ userId: data.userId, type },
			{
				expiresIn,
				secret: jwtConfig().secret,
			},
		)
	}

	async generateAuthTokens<T extends PayloadLike>(
		data: T,
		clientId?: string,
	): Promise<AuthTokens> {
		const accessToken = await this.generateToken(data)
		const refreshToken = await this.generateToken(data, TokenType.Refresh)

		if (clientId) {
			let found = await this.sessionMySqlRepository.findOneBy({
				clientId,
				userId: data.userId,
			})
			if (!found) {
				found = await this.sessionMySqlRepository.save({
					clientId,
					userId: data.userId,
				})
			}
			await this.sessionMySqlRepository.save({
				sessionId: found.sessionId,
				userId: found.userId,
				clientId: found.clientId,
			})
		}

		return {
			accessToken,
			refreshToken,
		}
	}

	async generateResponse<T extends object>(
		userId: string,
		data: T,
		authTokensRequested: boolean = false,
		clientId?: string,
	): Promise<Response<T>> {
		const tokens = authTokensRequested
			? await this.generateAuthTokens({ userId }, clientId)
			: undefined

		return {
			data,
			tokens,
		}
	}
}

export interface Response<T extends object> {
  data: T;
  tokens?: AuthTokens;
}

export interface PayloadLike {
  userId: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
