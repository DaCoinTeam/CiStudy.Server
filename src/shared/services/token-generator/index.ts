import { jwtConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export default class TokenGeneratorService {
	constructor(private readonly jwtService: JwtService) {}

	private generateToken<T extends object>(
		data: T,
		type: TokenType = TokenType.Access,
	) {
		const typeToExpiresIn: Record<TokenType, string> = {
			[TokenType.Access]: jwtConfig().accessTokenExpiryTime,
			[TokenType.Refresh]: jwtConfig().refreshTokenExpiryTime,
			[TokenType.Verify]: jwtConfig().verifyTokenExpiryTime,
		}
		const expiresIn = typeToExpiresIn[type]

		return this.jwtService.sign({...data}, {
			expiresIn,
			secret: jwtConfig().secret,
		})
	}
	generateAuthTokens<T extends object>(
		data: T
	) : AuthTokens {
		const accessToken = this.generateToken<T>(data)
		const refreshToken = this.generateToken<T>(data, TokenType.Refresh)
		return {
			accessToken,
			refreshToken
		}
	}

	generateTokenizedResponse<T extends object>(data: T): TokenizedResponse<T> {
		const tokens = this.generateAuthTokens(data)

		return {
			data,
			tokens
		}
	}
}

export interface TokenizedResponse<T extends object> {
  data: T;
  tokens: AuthTokens
}

export enum TokenType {
  Access,
  Refresh,
  Verify,
}

export interface AuthTokens {
	accessToken: string,
	refreshToken: string
}