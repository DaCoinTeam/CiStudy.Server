import { ApiProperty } from "@nestjs/swagger"
import {
	IsDateString,
	IsEmail,
	IsNotEmpty,
	IsStrongPassword,
} from "class-validator"

export default class SignUpRequestDto {
  @IsEmail()
  @ApiProperty({ example: "starci@gmail.com", description: "Email" })
  	email: string

  @IsStrongPassword()
  @ApiProperty({ example: "Cuong123_A", description: "Password" })
  	password: string

  @IsNotEmpty()
  @ApiProperty({ example: "Cuong123_A", description: "Password" })
  	confirm: string

  @IsNotEmpty()
  @ApiProperty({ example: "Nguyen Van Tu", description: "First Name" })
  	firstName: string

  @IsNotEmpty()
  @ApiProperty({ example: "Cuong", description: "Last Name" })
  	lastName: string

  @IsDateString()
  @ApiProperty({ example: "2002-03-18", description: "Birthdate" })
  	birthdate: Date
}
