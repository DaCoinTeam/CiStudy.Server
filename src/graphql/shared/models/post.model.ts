/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from "@nestjs/graphql"
import PostContent from "./post-content.model"

@ObjectType()
export default class Post {
  @Field((type) => ID)
  	postId: string

  @Field((type) => String)
  	creatorId: string

  @Field((type) => String)
  	title: string

  @Field((type) => String)
  	courseId: string

  @Field((type) => PostContent)
  	postContent: PostContent
}
