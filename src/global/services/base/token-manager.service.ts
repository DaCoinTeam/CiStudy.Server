import { jwtConfig } from "@config"
import { RefreshMySqlService } from "@database"
import {
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export default class TokenManagerService {
	constructor(
    private readonly jwtService: JwtService,
    private readonly refreshMySqlService: RefreshMySqlService,
	) {}

	async verifyToken<T extends object>(token: string): Promise<T | null> {
		try {
			return await this.jwtService.verifyAsync<T>(token)
		} catch (ex) {
			return null
		}
	}

	async validateRefreshToken(
		clientId: string,
		userId: string,
		token: string,
	): Promise<void> {
		const refresh = await this.refreshMySqlService.findByClientIdAndUserId(
			clientId,
			userId,
		)
		if (refresh.token !== token || refresh.isDeleted)
			throw new UnauthorizedException("Invalid refresh token.")
	}

	private async generateToken<T extends object>(
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
			{ ...data },
			{
				expiresIn,
				secret: jwtConfig().secret,
			},
		)
	}
	async generateAuthTokens<T extends object>(
		userId: string,
		data: T,
		clientId?: string
	): Promise<AuthTokens> {
		const accessToken = await this.generateToken<T>(data)
		const refreshToken = await this.generateToken<T>(data, TokenType.Refresh)

		if (clientId) {
			const createOrUpdateResult = await this.refreshMySqlService.createOrUpdate({
				clientId,
				userId,
				token: refreshToken,
			})
	
			if (!createOrUpdateResult)
				throw new InternalServerErrorException(
					"Cannot create or update refresh token.",
				)
		}

		return {
			accessToken,
			refreshToken,
		}
	}

	async generateResponse<T extends object>(
		userId: string,
		data: T,
		authTokensRequested: boolean = true,
		clientId?: string,
	): Promise<Response<T>> {
		const tokens = await this.generateAuthTokens(userId, data, clientId)

		return {
			data,
			...(authTokensRequested ? { tokens } : undefined),
		}
	}
}

export interface Response<T extends object> {
  data: T;
  tokens?: AuthTokens;
}

export enum TokenType {
  Access,
  Refresh,
  Verify,
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
