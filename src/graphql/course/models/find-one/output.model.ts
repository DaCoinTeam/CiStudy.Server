/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, ObjectType } from "@nestjs/graphql"
import { Response } from "../../../shared"
import { Course } from "../shared"

@ObjectType()
export default class FindOneOutput extends Response(Course) {
}