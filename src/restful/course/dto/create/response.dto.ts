import { ApiProperty } from "@nestjs/swagger"

export enum VerifyStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export default class CreateReponseDto {
  @ApiProperty()
  	data: {
    courseId: string;
    thumbnail: string;
    title: string;
    description: string;
    price: number;
    verifyStatus: VerifyStatus;
    isDraft: boolean;
    isPublished: boolean;
    studentId: string;
    creatorId: string;
  }
  @ApiProperty()
  	tokens: {
    accessToken: string;
    refreshToken: string;
  }
}
