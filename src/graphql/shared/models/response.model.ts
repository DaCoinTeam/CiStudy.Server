/* eslint-disable @typescript-eslint/no-unused-vars */
import { Type } from "@nestjs/common"
import { Field, ObjectType } from "@nestjs/graphql"

const Response = <T extends object>(T: Type<T>) => {
    @ObjectType()
	abstract class Response {
        @Field(type => T)
    	data: T

    @Field(type => AuthTokens, { nullable: true })
    	tokens: AuthTokens
    }
    return Response
}

export default Response

@ObjectType()
export class AuthTokens{
    @Field(type => String)
    	accessToken: string 
    @Field(type => String)
    	refreshToken: string
}