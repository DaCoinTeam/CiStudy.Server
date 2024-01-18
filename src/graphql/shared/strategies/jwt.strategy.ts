import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConfig } from "@config"
import { UserMySqlEntity } from "@database"
import { Injectable } from "@nestjs/common"

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConfig().secret,
		})
	}

	async validate(payload: UserMySqlEntity & {
		iat: number,
		exp: number
	}): Promise<UserMySqlEntity> {
		return payload
	}
}