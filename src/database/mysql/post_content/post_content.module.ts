import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import PostContentEntity from "./post_content.entity"
import PostContentService from "./post_content.service"
import PostEntity from "../post/post.entity"
import { PostCommentEntity } from "../post_comment/post_comment.entity"
import PostCommentContentEntity from "../post_comment_content/post_comment_content.entity"

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, PostCommentEntity, PostCommentContentEntity, PostContentEntity])],
	providers: [PostContentService],
	exports: [PostContentService]
})
export default class PostContentModule {}
