import { ApiProperty } from "@nestjs/swagger"

export default class SignUpRequestBody {
  @ApiProperty({ example: "starci@gmail.com", description: "Email" })
  	email: string

  @ApiProperty({ example: "Cuong123_A", description: "Password" })
  	password: string

  @ApiProperty({ example: "Nguyen Van Tu", description: "First Name" })
  	firstName: string

  @ApiProperty({ example: "Cuong", description: "Last Name" })
  	lastName: string

  @ApiProperty({ example: "2002/03/18", description: "Birthdate" })
  	birthdate: Date
}
