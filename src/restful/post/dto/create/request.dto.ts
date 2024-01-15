import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID, MinLength } from "class-validator"
import { PostContentDto } from "src/shared/dtos/post-content.dto"

export default class CreatePostDto {
  @IsNotEmpty()
  @MinLength(20)
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
  	postContents: PostContentDto[]

  creatorId: string
}
