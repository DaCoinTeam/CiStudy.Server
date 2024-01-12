import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConfig } from "@config"
import { AuthenticationError } from "apollo-server-core"
import { UserMySqlService } from "@database"
import { Payload, UserDto } from "@shared"
import { Injectable } from "@nestjs/common"

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userMySqlService: UserMySqlService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConfig().secret,
		})
	}

	async validate(payload: Payload): Promise<UserDto> {
		const user = await this.userMySqlService.findByUserId(payload.userId)
		if (!user) {
			throw new AuthenticationError("User not found.")
		}
		return user
	}
}