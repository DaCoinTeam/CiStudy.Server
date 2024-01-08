import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConfig } from "@config"
import { BadRequestException, Injectable } from "@nestjs/common"
import { UserMySqlService } from "@database"
import { UserMySqlEntity } from "@database"
import { Payload } from "@shared"

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userMySqlService: UserMySqlService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConfig().secret,
		})
	}

	async validate(payload: Payload): Promise<UserMySqlEntity> {
		const user = await this.userMySqlService.findByUserId(payload.userId)
		if (!user) {
			throw new BadRequestException("User not found.")
		}
		return user
	}
}