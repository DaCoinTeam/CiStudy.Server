import { ContentType } from "@database"
import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsUUID, Length } from "class-validator"


export default class PostContent {
  @IsUUID()
  @ApiProperty()
  	postContentId: string

  @IsInt()
  @ApiProperty()
  	index: number

  @Length(20, 1000)
  @ApiProperty()
  	content: string

  @ApiProperty()
  	contentType: ContentType

  @IsUUID()
  @ApiProperty()
  	postId: string
}
