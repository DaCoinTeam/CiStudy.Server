import { ApiProperty } from "@nestjs/swagger"
import { ContentType } from "@database"
import { IsString, IsUUID } from "class-validator"

export default class CommentDto {
    @IsUUID()
    @ApiProperty({
  	    example: "026e74b1-d587-4249-a53f-6413264c1e94",
  	    description: "UserId",
    })
  	userId: string

    @IsUUID()
    @ApiProperty({
    	example: "026e74b1-d587-4249-a53f-6413264c1e94",
      	description: "PostId",
    })
    	postId: string

    @ApiProperty()
  	postCommentContents: CommentContentRequestDto[]
}

export class CommentContentRequestDto {
    @IsString()
    @ApiProperty()
    	content: string
    
    @ApiProperty()
    	contentType: ContentType
}