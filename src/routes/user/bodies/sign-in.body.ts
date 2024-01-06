import { ApiProperty } from "@nestjs/swagger"

export default class SignInRequestBody {
  @ApiProperty({ example: "starci@gmail.com", description: "Email" })
  	email: string

  @ApiProperty({ example: "Cuong123_A", description: "Password" })
  	password: string
}
