import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { Payload, UserMySqlDto } from "@shared"
import { UserMySqlService } from "@database"

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userMySqlService: UserMySqlService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConfig().secret,
		})
	}

	async validate(payload: Payload): Promise<UserMySqlDto> {
		const userId = payload.userId
		return await this.userMySqlService.findByUserId(userId)
	}
}
