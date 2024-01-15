import { ApiProperty } from "@nestjs/swagger"
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"
import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator"

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
  	postContents: PostContentRequestDto[]

}

export enum ContentType {
  Text = "Text",
  Video = "Video",
  Code = "Code",
  Image = "Image",
  Label = "Label"
}

export class PostContentRequestDto {
  @IsString()
  @ApiProperty()
  	content: string
  
  @ApiProperty()
  	contentType: ContentType
}

export const createSchema : SchemaObject = {
	type: "object",
	properties: {
		postContent: {
			type: "array",
			properties: {
				item: {
					
					type: "file",
					format: "binary"
				}
			}
		}
	}
}