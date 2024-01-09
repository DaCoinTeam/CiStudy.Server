import { IsEmail, IsStrongPassword, Length } from "class-validator"

export default class SignInDto {
  @IsEmail()
  	email: string
  @IsStrongPassword()
  @Length(6, 20)
  	password: string
}
