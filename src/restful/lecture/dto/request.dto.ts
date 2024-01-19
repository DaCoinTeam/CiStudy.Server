import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { BaseDto } from "src/shared/dtos/mysql/base.dto"

export default class CreateRequestDto extends BaseDto {
  @IsNotEmpty()
  @ApiProperty()
  	lectureTitle: string

  @IsNotEmpty()
  @ApiProperty()
  	sectionId: number
}
