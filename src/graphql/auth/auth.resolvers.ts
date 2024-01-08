import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { UserKind, UserMySqlService } from "@database"
import { User } from "src/graphql.schema"

import { PubSub } from "graphql-subscriptions"
import { Sha256Service } from "@shared"
import {
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common"
import { SignInDto } from "./dto"
import { FirebaseService } from "@3rd"

const pubSub = new PubSub()

@Resolver("User")
export default class AuthResolvers {
	constructor(
    private readonly userMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
	private readonly firebaseService: FirebaseService
	) {}

  @Query("signIn")
	async signIn(@Args("input") args: SignInDto): Promise<User> {
		const found = await this.userMySqlService.findByEmail(args.email)
		if (!found) throw new NotFoundException("User not found.")
		if (!this.sha256Service.verifyHash(args.password, found.password))
			throw new UnauthorizedException("Invalid credentials.")
		return found
	}

	@Mutation("verifyGoogleAccessToken")
  async verifyGoogleAccessToken(@Args("input") token: string) : Promise<User> {
  	const decoded = await this.firebaseService.verifyGoogleAccessToken(token)
  	if (!decoded) throw new UnauthorizedException("Invalid Google access token.")
		
  	const found = await this.userMySqlService.findByExternalId(decoded.uid)
  	if (found) return found

  	const created =  await this.userMySqlService.create({
  		externalId: decoded.uid,
  		email: decoded.email,
  		avatarUrl: decoded.picture,
  		phoneNumber: decoded.phone_number,
  		kind: UserKind.Google
  	})	

	  pubSub.publish("userCreated", created)
	  return created
  }
}
