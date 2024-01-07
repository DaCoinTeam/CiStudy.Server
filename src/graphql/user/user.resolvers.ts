import { Resolver, Query, Mutation, Args, Subscription } from "@nestjs/graphql"
import { UserMySqlService } from "@database"
import { User } from "src/graphql.schema"

import { PubSub } from "graphql-subscriptions"
import { Sha256Service } from "@shared"
import {
	ConflictException,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common"
import { SignInDto, SignUpDto } from "./dto"

const pubSub = new PubSub()

@Resolver("User")
export default class UserResolvers {
	constructor(
    private readonly userMySqlService: UserMySqlService,
    private readonly sha256Service: Sha256Service,
	) {}

  @Query("signIn")
	async signIn(@Args("input") args: SignInDto): Promise<User> {
		const found = await this.userMySqlService.findByEmail(args.email)
		if (!found) throw new NotFoundException("User not found.")
		if (!this.sha256Service.verifyHash(args.password, found.password))
			throw new UnauthorizedException("Invalid credentials.")
		return found
	}
}
