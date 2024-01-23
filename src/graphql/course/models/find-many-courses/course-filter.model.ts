/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType } from "@nestjs/graphql"

@InputType()
export default class CourseFilterModel {
    @Field(() => String, { nullable: true})
    category?: string
}