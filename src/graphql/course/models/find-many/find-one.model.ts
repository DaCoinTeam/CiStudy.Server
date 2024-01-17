/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType } from "@nestjs/graphql"

@InputType()
export default class FindOne {
  @Field(type => ID)
  	courseId: string
}