/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from "@nestjs/graphql"
import PostContent from "./post-content.model"
import UserModel from "./user.model"
import CourseModel from "./course.model"

@ObjectType()
export default class PostModel {
  @Field((type) => ID)
  	postId: string

  @Field((type) => String)
  	title: string

  @Field((type) => CourseModel)
  	course: CourseModel

  @Field((type) => [PostContent])
  	postContents: PostContent[]

  @Field((type) => UserModel)
  	creator: UserModel
}
