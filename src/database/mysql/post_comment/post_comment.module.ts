import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PostCommentEntity } from "./post_comment.entity"
import PostCommentService from "./post_comment.service"
import PostCommentContentEntity from "../post_comment_content/post_comment_content.entity"
import PostEntity from "../post/post.entity"
import PostContentEntity from "../post_content/post_content.entity"

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, PostCommentEntity, PostCommentContentEntity, PostContentEntity])],
	providers: [PostCommentService],
	exports: [PostCommentService]
})
export default class PostCommentModule {}