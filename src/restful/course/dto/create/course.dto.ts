import { ApiProperty } from "@nestjs/swagger"
import { Expose, Transform } from "class-transformer"
import { IsJSON, IsNotEmpty } from "class-validator"

interface CourseIncludes {
  time: number;
}
export default class CourseDto {
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  	title: string

  @IsNotEmpty()
  @Expose()
  @ApiProperty({ type: "string",  format: "binary" })
  	thumbnailUrl: string

  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  	description: string

  @IsNotEmpty()
  @Expose()
  @Transform(({ value }) => parseFloat(value))
  @ApiProperty()
  	price: number

  // @ApiProperty()
  creatorId: string

  @IsNotEmpty()
  @Expose()
  @ApiProperty({format: "binary"})
  	previewVideoUrl: string

  @Expose()
  @ApiProperty()
  	targets: string

  @IsJSON()
  @Expose()
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