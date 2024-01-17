/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Field,
	Float,
	ID,
	ObjectType
} from "@nestjs/graphql"
import { VerifiedStatus } from "@shared"

@ObjectType()
export default class Course {
  @Field(type => ID)
  	courseId: string

  @Field(type => String)
  	title: string

  @Field(type => String, { nullable: true })
  	thumbnailUrl: string

  @Field(type => String)
  	description: string

  @Field(type => Float, { defaultValue: 0 })
  	price: number

  @Field(type => VerifiedStatus, { nullable: true })
  	verifiedStatus: VerifiedStatus

  @Field(type => Boolean, { defaultValue: true})
  	isDraft: boolean

  @Field(type => String)
  	creatorId: string

  @Field(type => Boolean, { defaultValue: false})
  	isDeleted: boolean

  @Field(type => String, { nullable: true})
  	previewVideoUrl: string

  @Field(type => String, { nullable: true})
  	targets: string

  @Field(type => String, { nullable: true})
  	includes: string
}
