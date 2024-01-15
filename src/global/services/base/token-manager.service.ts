import { jwtConfig } from "@config"
import { SessionMySqlService } from "@database"
import {
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from "@nestjs/common"
import { JsonWebTokenError, JwtService } from "@nestjs/jwt"
import { Payload } from "@shared"

@Injectable()
export default class TokenManagerService {
	constructor(
    private readonly jwtService: JwtService,
    private readonly sessionMySqlService: SessionMySqlService,
	) {}

	// rất ít khi xài bởi vì guard lo hết rồi. làm thủ công thì cần
	async verifyToken(token: string): Promise<Payload> {
		try {
			return await this.jwtService.verifyAsync<Payload>(token)
		} catch (ex) {
			if (ex instanceof JsonWebTokenError) {
				throw new UnauthorizedException("Invalid token.")
			}
		}
	}

	//cái này là cái check map
	async validateRefreshToken(userId: string, clientId: string): Promise<void> {
		const refresh = await this.sessionMySqlService.findByUserIdAndClientId(
			userId,
			clientId,
		)
		console.log(refresh)
		if (refresh === null)
			throw new UnauthorizedException("Refresh token not found.")
		if (refresh.isDisabled)
			throw new UnauthorizedException("Invalid refresh token.")
	}

	private async generateToken<T extends Payload>(
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
			{ userId: data.userId },
			{
				expiresIn,
				secret: jwtConfig().secret,
			},
		)
	}

	// cho phép mày triển 1 cái clientId (optials), nếu browser có gửi clientId thì mới cái entry refresh vào db
	async generateAuthTokens<T extends Payload>(
		data: T,
		clientId?: string,
	): Promise<AuthTokens> {
		const accessToken = await this.generateToken(data)
		const refreshToken = await this.generateToken(data, TokenType.Refresh)

		if (clientId) {
			const createOrUpdateResult =
        await this.sessionMySqlService.createOrUpdate({
        	clientId,
        	userId: data.userId,
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
		refresh: boolean = false,
		clientId?: string,
	): Promise<Response<T>> {
		const tokens = refresh
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

export enum TokenType {
  Access,
  Refresh,
  Verify,
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
