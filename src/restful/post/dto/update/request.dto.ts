import { ApiProperty } from "@nestjs/swagger"
import { ContentType } from "@database"
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator"

export default class UpdatePostDto {

  @IsUUID()
  @ApiProperty({
  	example: "026e74b1-d587-4249-a53f-6413264c1e94",
  	description: "Post ID",
  })
  	postId: string

  @IsNotEmpty()
  @Length(20)
  @ApiProperty({
  	example: "hentaiz.net",
  	description: "Title",
  })
  	title: string

  @ApiProperty()
  	postContents: PostContentRequestDto[]
}

class PostContentRequestDto {
  @IsString()
  @ApiProperty()
  	content: string
  
  @ApiProperty()
  	contentType: ContentType
}