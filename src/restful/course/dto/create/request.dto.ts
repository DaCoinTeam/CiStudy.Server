import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsJSON, IsNotEmpty } from "class-validator"

interface CourseIncludes {
  time: number;
}
export default class CreateRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  	title: string

  @ApiProperty({ type: "string",  format: "binary" })
  	thumbnailUrl: string

  @IsNotEmpty()
  @ApiProperty()
  	description: string

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @ApiProperty()
  	price: number

  // @ApiProperty()
  creatorId: string

  @ApiProperty({format: "binary"})
  	previewVideoUrl: string

  @ApiProperty()
  	targets: string

  @IsJSON()
  @ApiProperty()
  	includes: CourseIncludes
}

export const swaggerSchema = {
	type: "object",
	properties: {
		thumbnailUrl: {
			type: "string",
			format: "binary",
		},
		title: {
			type: "string",
		},
		description: {
			type: "string",
		},
		price: {
			type: "number",
		},
		previewVideoUrl: {
			type: "string",
			format: "binary",
		},
		targets: {
			type: "array",
			items: {
				type: "string",
			},
		},
		includes: {
			type: "object",
			properties: {
				property1: {
					type: "string",
				},
			},
		},
	}
}