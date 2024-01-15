import { ApiProperty } from "@nestjs/swagger"
import { Exclude, Expose } from "class-transformer"

export enum VerifiedStatus {
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
  
  @Exclude()
  @ApiProperty()
  	verifiedStatus: VerifiedStatus

  @ApiProperty()
  	creatorId: string

  @ApiProperty()
  	previewVideoUrl: string

  @ApiProperty()
  	targets: string

  @ApiProperty()
  	includes: CourseIncludes
}
