import {IsJWT } from "class-validator"

export default class VerifyRegistrationRequestDto {
  @IsJWT()
  	token: string
}
