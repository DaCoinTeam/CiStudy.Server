import {
	IsEmail,
	IsStrongPassword,
	IsDateString,
	Length,
} from "class-validator"

export default class SignUpDto {
  @IsEmail()
  	email: string
  @IsStrongPassword()
  @Length(6, 20)
  	password: string
  @Length(2, 50)
  	firstName: string
  @Length(2, 50)
  	lastName: string
  @IsDateString()
  	birthday: Date
}
