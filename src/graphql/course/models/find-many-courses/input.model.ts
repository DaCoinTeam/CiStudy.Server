/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType } from "@nestjs/graphql"
import CourseFilterModel from "./course-filter.model"

@InputType()
export default class FindManyCoursesInput {
    @Field(() => CourseFilterModel, { nullable: true })
    filter?: CourseFilterModel
}