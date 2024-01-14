import {IsJWT } from "class-validator"

export default class VerifyGoogleAccessTokenRequestDto {
  @IsJWT()
  	token: string
}
