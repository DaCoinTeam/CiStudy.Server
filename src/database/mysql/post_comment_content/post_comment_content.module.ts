import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import PostCommentContentEntity from "./post_comment_content.entity"
import PostCommentContentService from "./post_comment_content.service"
import PostEntity from "../post/post.entity"
import { PostCommentEntity } from "../post_comment/post_comment.entity"
import PostContentEntity from "../post_content/post_content.entity"

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, PostCommentEntity, PostCommentContentEntity, PostContentEntity])],
	providers: [PostCommentContentService],
	exports: [PostCommentContentService]
})
export default class PostCommentContentModule {}