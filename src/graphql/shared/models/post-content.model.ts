/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentType } from "@database"
import { Field, ID, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export default class PostContent {
  @Field((type) => ID)
  	postContentId: string

  @Field((type) => Int)
  	index: number

  @Field((type) => String)
  	content: string

  @Field((type) => ContentType)
  	contentType: ContentType

  @Field((type) => String)
  	postId: string
}
