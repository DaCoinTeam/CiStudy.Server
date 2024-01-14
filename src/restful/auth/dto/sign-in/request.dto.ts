import { IsEmail, IsStrongPassword, Length } from "class-validator"

export default class SignInRequestDto {
  @IsEmail()
  	email: string
  @IsStrongPassword()
  @Length(6, 20)
  	password: string
}
