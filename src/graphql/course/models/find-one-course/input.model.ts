/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType } from "@nestjs/graphql"
import { IsUUID } from "class-validator"

@InputType()
export default class FindOneCourseInput {
  @Field(() => ID)
  @IsUUID()
  	courseId: string
}