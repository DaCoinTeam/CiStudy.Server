import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator"

export default class CreateRequestDto {
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
