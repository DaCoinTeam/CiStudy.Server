import PostCommentContentDto from "./post-comment-content.dto"

export default interface PostCommentDto {
    postCommentId: string;
    userId: string;
    postId: string;
    fatherCommentId?: string | null;
    postCommentContents: PostCommentContentDto[]
}
