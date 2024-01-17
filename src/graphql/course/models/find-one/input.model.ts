/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType } from "@nestjs/graphql"

@InputType()
export default class FindOneInput {
  @Field(type => ID)
  	courseId: string
}