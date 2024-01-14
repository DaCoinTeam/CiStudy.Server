import {IsJWT, IsUUID } from "class-validator"

export default class VerifyGoogleAccessTokenRequestDto {
  @IsUUID()
  	clientId: string
  @IsJWT()
  	token: string
}
