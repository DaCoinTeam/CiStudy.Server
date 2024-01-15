import { Module } from "@nestjs/common"
import PostController from "./post.controller"
import PostService from "./post.service"
import { PostMySqlModule, PostLikeMySqlModule } from "@database"

@Module({
	imports: [PostMySqlModule, PostLikeMySqlModule],
	controllers: [PostController],
	providers: [PostService],
})
export default class PostModule {}