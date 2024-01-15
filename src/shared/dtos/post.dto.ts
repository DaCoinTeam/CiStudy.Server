import { PostContentDto } from "./post-content.dto"

export interface PostDto {
  postId: string;
  title: string;
  creatorId: string;
  courseId: string;
  postContents: Partial<PostContentDto>[]
}