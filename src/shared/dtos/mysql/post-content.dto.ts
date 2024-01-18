import { ContentType } from "@database"

export default interface PostContentDto {
  postContentId: string;
  index: number;
  content: string;
  contentType: ContentType;
  postId: string;
}
