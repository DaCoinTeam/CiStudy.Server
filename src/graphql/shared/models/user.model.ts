/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserKind, UserRole } from "@database"
import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
export default class UserModel {
  @Field(() => ID)
  	userId: string

  @Field((type) => String)
  	email: string

  @Field((type) => String, { nullable: true })
  	password: string

  @Field((type) => String, { nullable: true })
  	avatarUrl: string

  @Field((type) => String, { nullable: true })
  	phoneNumber: string

  @Field(() => Number, { nullable: true })
  	balance: number

  @Field(() => UserRole)
  	role: UserRole

  @Field((type) => String, { nullable: true })
  	walletId: string

  @Field((type) => String, { nullable: true })
  	firstName: string

  @Field((type) => String, { nullable: true })
  	lastName: string

  @Field((type) => Date, { nullable: true })
  	birthdate: Date

  @Field((type) => Boolean)
  	verified: boolean

  @Field((type) => UserKind)
  	kind: UserKind

  @Field((type) => String, { nullable: true })
  	externalId: string
}