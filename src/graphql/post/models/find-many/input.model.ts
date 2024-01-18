import { Field, InputType, Int } from "@nestjs/graphql"
import { IsInt, IsUUID } from "class-validator"

@InputType()
export default class FindManyPostInput {
  @Field(() => String)
  @IsUUID()
  	courseId: string
  @Field(() => Int)
  @IsInt()
  	pageNumber: number
  @Field(() => Int)
  @IsInt()
  	pageSize: number
}
