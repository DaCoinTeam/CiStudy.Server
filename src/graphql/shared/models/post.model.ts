/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from "@nestjs/graphql"
import PostContent from "./post-content.model"
import UserModel from "./user.model"
import CourseModel from "./course.model"

@ObjectType()
export default class PostModel {
  @Field(() => ID)
  	postId: string

  @Field(() => String)
  	title: string

  @Field(() => CourseModel)
  	course: CourseModel

  @Field(() => [PostContent])
  	postContents: PostContent[]

  @Field(() => UserModel)
  	creator: UserModel
}
