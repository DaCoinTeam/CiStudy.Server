import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { UserKind, UserMySqlService } from "@database"

import { PubSub } from "graphql-subscriptions"
import {
	Sha256Service,
	TokenManagerService,
	Response,
	FirebaseService,
} from "@global"
import {
	NotFoundException,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common"
import {
	InitRequestDto,
	SignInRequestDto,
	VerifyGoogleAccessTokenRequestDto,
} from "./dtos"
import { JwtAuthGuard } from "../shared/guard"
import { User } from "../shared"
import { UserMySqlDto } from "@shared"

const pubSub = new PubSub()

@Resolver("User")
export default class AuthResolvers {
	constructor(
    private readonly userMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
    private readonly firebaseService: FirebaseService,
    private readonly tokenManagerService: TokenManagerService,
	) {}

  @Query("signIn")
	async signIn(
    @Args("input") args: SignInRequestDto,
	): Promise<Response<UserMySqlDto>> {
		const found = await this.userMySqlService.findByEmail(args.email)
		if (!found) throw new NotFoundException("User not found.")
		if (!this.sha256Service.verifyHash(args.password, found.password))
			throw new UnauthorizedException("Invalid credentials.")
		console.log(args)
		return this.tokenManagerService.generateResponse(
			found.userId,
			found,
			true,
			args.clientId,
		)
	}

  @Query("init")
  @UseGuards(JwtAuthGuard)
  async init(
    @User() user: UserMySqlDto,
    @Args("input") args: InitRequestDto,
  ): Promise<Response<UserMySqlDto>> {
  	return this.tokenManagerService.generateResponse(
  		user.userId,
  		user,
  		true,
  		args.clientId,
  	)
  }

  @Mutation("verifyGoogleAccessToken")
  async verifyGoogleAccessToken(
    @Args("input") args: VerifyGoogleAccessTokenRequestDto,
  ): Promise<Response<UserMySqlDto>> {
  	const decoded = await this.firebaseService.verifyGoogleAccessToken(
  		args.token,
  	)
  	if (!decoded)
  		throw new UnauthorizedException("Invalid Google access token.")

  	let found = await this.userMySqlService.findByExternalId(decoded.uid)
  	if (!found) {
  		found = await this.userMySqlService.create({
  			externalId: decoded.uid,
  			email: decoded.email,
  			avatarUrl: decoded.picture,
  			phoneNumber: decoded.phone_number,
  			kind: UserKind.Google,
  		})
  	}

  	pubSub.publish("userCreated", found)
  	return this.tokenManagerService.generateResponse(
  		found.userId,
  		found,
  		true,
  		args.clientId,
  	)
  }
}
