import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { UserKind, UserMySqlService } from "@database"

import { PubSub } from "graphql-subscriptions"
import {
	Sha256Service,
	TokenGeneratorService,
	TokenizedResponse,
	FirebaseService
} from "@global"
import {
	NotFoundException,
	UnauthorizedException,
	UseGuards
} from "@nestjs/common"
import { SignInRequestDto } from "./dtos"
import { JwtAuthGuard } from "../shared/guard"
import { User } from "../shared"
import { UserDto } from "@shared"

const pubSub = new PubSub()

@Resolver("User")
export default class AuthResolvers {
	constructor(
	private readonly userMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
    private readonly firebaseService: FirebaseService,
    private readonly tokenGeneratorService: TokenGeneratorService,
	) {}

  @Query("signIn")
	async signIn(
    @Args("input") args: SignInRequestDto,
	): Promise<TokenizedResponse<UserDto>> {
		const found = await this.userMySqlService.findByEmail(args.email)
		if (!found) throw new NotFoundException("User not found.")
		if (!this.sha256Service.verifyHash(args.password, found.password))
			throw new UnauthorizedException("Invalid credentials.")
		return this.tokenGeneratorService.generateTokenizedResponse(found)
	}

  @Query("init")
  @UseGuards(JwtAuthGuard)
  async init(
    @User() user: UserDto,
  ): Promise<TokenizedResponse<UserDto>> {
  	return this.tokenGeneratorService.generateTokenizedResponse(user)
  }

  @Mutation("verifyGoogleAccessToken")
  async verifyGoogleAccessToken(
    @Args("input") token: string,
  ): Promise<TokenizedResponse<UserDto>> {
  	const decoded = await this.firebaseService.verifyGoogleAccessToken(token)
  	if (!decoded)
  		throw new UnauthorizedException("Invalid Google access token.")

  	const found = await this.userMySqlService.findByExternalId(decoded.uid)
  	if (found)
  		return this.tokenGeneratorService.generateTokenizedResponse(found)

  	const created = await this.userMySqlService.create({
  		externalId: decoded.uid,
  		email: decoded.email,
  		avatarUrl: decoded.picture,
  		phoneNumber: decoded.phone_number,
  		kind: UserKind.Google,
  	})

  	pubSub.publish("userCreated", created)
  	return this.tokenGeneratorService.generateTokenizedResponse(created)
  }
}
