import { ApiProperty } from "@nestjs/swagger"

export enum VerifyStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected",
  }

export default class CreateReponseDto {
    @ApiProperty()
    	courseId: string
    @ApiProperty()
    	thumbnail: string
    @ApiProperty()
    	title: string
    @ApiProperty()
    	description: string
    @ApiProperty()
    	price: number
    @ApiProperty()
    	verifyStatus: VerifyStatus
    @ApiProperty()
    	isDraft: boolean
    @ApiProperty()
    	isPublished: boolean
    @ApiProperty()
    	studentId: string
    @ApiProperty()
    	creatorId: string
}
  