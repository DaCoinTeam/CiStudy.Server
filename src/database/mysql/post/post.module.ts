import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import PostEntity from "./post.entity"
import PostService from "./post.service"
import { PostCommentEntity } from "../post_comment/post_comment.entity"
import PostCommentContentEntity from "../post_comment_content/post_comment_content.entity"
import PostContentEntity from "../post_content/post_content.entity"

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, PostCommentEntity, PostCommentContentEntity, PostContentEntity])],
	providers: [PostService],
	exports: [PostService]
})
export default class PostModule {}