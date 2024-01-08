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

	generateTokenizedResponse<T extends object>(data: T): TokenizedResponse<T> {
		const accessToken = this.generateToken<T>(data)
		const refreshToken = this.generateToken<T>(data, TokenType.Refresh)

		return {
			data,
			tokens: {
				accessToken,
				refreshToken,
			},
		}
	}
}

export interface TokenizedResponse<T extends object> {
  data: T;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export enum TokenType {
  Access,
  Refresh,
  Verify,
}
