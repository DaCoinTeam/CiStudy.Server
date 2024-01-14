import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

export enum VerifyStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}
interface CourseIncludes {
  time: number;
}

export default class CreateReponseDto {
  @ApiProperty()
  	thumbnailUrl: string

  @ApiProperty()
  	title: string

  @ApiProperty()
  	description: string

  @ApiProperty()
  	price: number
  
  @Expose()
  @ApiProperty()
  	verifyStatus: VerifyStatus

  @ApiProperty()
  	creatorId: string

  @ApiProperty()
  	previewVideoUrl: string

  @ApiProperty()
  	targets: string[]

  @ApiProperty()
  	includes: CourseIncludes
}
