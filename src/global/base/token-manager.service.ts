import { jwtConfig } from "@config"
import { RefreshMySqlService } from "@database"
import { Injectable, InternalServerErrorException } from "@nestjs/common"
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

	async validateAndVerifyRefreshToken<T extends object>(
		clientId: string,
		userId: string,
		token: string,
	): Promise<T | null> {
		try {
			const refresh = await this.refreshMySqlService.findByClientIdAndUserId(
				clientId,
				userId,
			)
			if (refresh.token !== token || refresh.isDeleted) return null
			return await this.verifyToken(token)
		} catch (ex) {
			return null
		}
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
	async generateAuthTokens<T extends object>(data: T): Promise<AuthTokens> {
		const accessToken = await this.generateToken<T>(data)
		const refreshToken = await this.generateToken<T>(data, TokenType.Refresh)
		return {
			accessToken,
			refreshToken,
		}
	}

	async generateResponse<T extends object>(
		clientId: string,
		userId: string,
		data: T,
		hasAuthTokens : boolean = true
	): Promise<Response<T>> {
		const tokens = await this.generateAuthTokens(data)

		const createOrUpdateResult = await this.refreshMySqlService.createOrUpdate({
			clientId,
			userId,
			token: tokens.refreshToken,
		})

		if (!createOrUpdateResult)
			throw new InternalServerErrorException(
				"Cannot create or update refresh token.",
			)

		return {
			data,
			...hasAuthTokens ? { tokens } : undefined
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
