import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import PostEntity from "./post.entity"
import PostService from "./post.service"
import PostContentEntity from "../post-content/post-content.entity"
import PostCommentEntity from "../post-comment/post-comment.entity"
import PostCommentContentEntity from "../post-comment-content/post-comment-content.entity"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			PostEntity,
			PostContentEntity,
			PostCommentEntity,
			PostCommentContentEntity,
		]),
	],
	providers: [PostService],
	exports: [PostService],
})
export default class PostModule {}
