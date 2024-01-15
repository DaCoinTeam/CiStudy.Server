// verifiedStatus
export enum VerifiedStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export default interface CourseDto {
  courseId: string;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  verifiedStatus: VerifiedStatus;
  isDraft: boolean;
  isPublished: boolean;
  studentId: string;
  creatorId: string;
}
