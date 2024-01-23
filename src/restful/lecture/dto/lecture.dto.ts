import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsNotEmpty, IsUUID } from "class-validator"

export default class LectureDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  lectureTitle: string

  @Expose()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  sectionId: string

  @Expose()
  @ApiProperty()
  video: string
}
