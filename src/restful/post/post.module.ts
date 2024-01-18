import { Module } from "@nestjs/common"
import PostController from "./post.controller"
import PostService from "./post.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
	PostMySqlEntity,
	PostContentMySqlEntity,
	PostLikeMySqlEntity,
	PostCommentMySqlEntity,
	PostCommentContentMySqlEntity,
	PostCommentLikeMySqlEntity,
} from "@database"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			PostMySqlEntity,
			PostLikeMySqlEntity,
			PostContentMySqlEntity,
			PostCommentMySqlEntity,
			PostCommentContentMySqlEntity,
			PostCommentLikeMySqlEntity,
		]),
	],
	controllers: [PostController],
	providers: [PostService],
})
export default class PostModule {}
