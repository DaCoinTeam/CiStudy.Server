import PostContentDto from "./post-content.dto"

export default interface PostDto {
  postId: string;
  title: string;
  creatorId: string;
  courseId: string;
  postContents: Partial<PostContentDto>[]
}