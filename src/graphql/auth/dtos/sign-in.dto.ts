import { IsEmail, IsStrongPassword, IsUUID, Length } from "class-validator"

export default class SignInRequestDto {
  @IsUUID()
  	clientId: string
  @IsEmail()
  	email: string
  @IsStrongPassword()
  @Length(6, 20)
  	password: string
}
