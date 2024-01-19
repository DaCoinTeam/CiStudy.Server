import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator"

export default class SectionDto {
  @Expose()
  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  sectionTitle: string

  @Expose()
  @ApiProperty()
  @IsUUID()
  @IsString()
  courseId: string
}
