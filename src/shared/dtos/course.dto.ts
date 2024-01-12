// verifiedStatus
export enum VerifyStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export interface CourseDto {
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
