import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from "class-validator"

export default class CreateRequestDto {
  @IsUUID()
  @ApiProperty()
  	clientId: string

  @IsNotEmpty()
  @ApiProperty()
  	title: string

  @IsNotEmpty()
  @ApiProperty()
  	thumbnail: string

  @IsNotEmpty()
  @ApiProperty()
  	description: string

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10000000)
  @ApiProperty()
  	price: number

  @IsNotEmpty()
  @ApiProperty()
  	creatorId: string
}
