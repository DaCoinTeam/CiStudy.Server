/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType } from "@nestjs/graphql"
import { IsUUID } from "class-validator"

@InputType()
export default class FindOneInput {
  @Field(type => ID)
  @IsUUID()
  	courseId: string
}