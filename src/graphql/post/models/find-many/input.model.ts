/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int } from "@nestjs/graphql"
import { IsInt, IsUUID } from "class-validator"

@InputType()
export default class FindManyPostInput {
  @Field((type) => Int)
  @IsInt()
  	pageNumber: number
  @Field((type) => Int)
  @IsInt()
  	pageSize: number
  @Field((type) => String)
  @IsUUID()
  	courseId: string
}
