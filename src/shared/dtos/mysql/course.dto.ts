import { registerEnumType } from "@nestjs/graphql"

// verifiedStatus
export enum VerifiedStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

//for graphql
registerEnumType(VerifiedStatus, {
	name: "VerifiedStatus",
})

export default interface CourseDto {
  courseId: string;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  verifiedStatus: VerifiedStatus;
  isDraft: boolean;
  isPublished: boolean;
  creatorId: string;
}
