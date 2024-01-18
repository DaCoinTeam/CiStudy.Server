import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { Payload } from "../interfaces"
import { TokenType } from "../enums"
import { InjectRepository } from "@nestjs/typeorm"
import { UserMySqlEntity } from "@database"
import { Repository } from "typeorm"

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserMySqlEntity)
		private readonly userMySqlRepository: Repository<UserMySqlEntity>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConfig().secret,
		})
	}

	async validate(payload: Payload): Promise<ValidatedInfo> {
		const { userId, type } = payload
		const user = await this.userMySqlRepository.findOneBy({ userId })
		return { user, type }
	}
}

export interface ValidatedInfo {
  user: UserMySqlEntity;
  type: TokenType;
}
