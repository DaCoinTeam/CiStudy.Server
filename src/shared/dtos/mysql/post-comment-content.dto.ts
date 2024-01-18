import { ContentType } from "@database"

export default interface PostCommentContentDto {
    postCommentContentId : string;
    index: number;
    content: string;
    contentType: ContentType;
    postCommentId: string;
  }
  