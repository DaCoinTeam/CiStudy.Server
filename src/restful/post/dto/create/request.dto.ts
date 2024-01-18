import { ApiProperty } from "@nestjs/swagger"
import { ContentType } from "@database"
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator"

export default class CreatePostDto {
  @IsNotEmpty()
  @Length(20)
  @ApiProperty({
  	example: "hentaiz.net",
  	description: "Title",
  })
  	title: string

  @IsUUID()
  @ApiProperty({
  	example: "026e74b1-d587-4249-a53f-6413264c1e94",
  	description: "CourseId",
  })
  	courseId: string

  @ApiProperty()
  	postContents: PostContentRequestDto[]
}

export class PostContentRequestDto {
  @IsString()
  @ApiProperty()
  	content: string
  
  @ApiProperty()
  	contentType: ContentType
}