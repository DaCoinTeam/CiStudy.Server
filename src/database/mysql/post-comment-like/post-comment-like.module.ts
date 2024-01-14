import { Module } from "@nestjs/common"
import  PostCommentLikeEntity  from "./post-comment-like.entity"
import  PostCommentLikeService  from "./post-comment-like.service"

@Module({
	imports: [PostCommentLikeEntity],
	providers: [PostCommentLikeService],
	exports: [PostCommentLikeService],
})
export default class PostCommentLikeModule {}