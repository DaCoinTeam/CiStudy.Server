import { Module } from "@nestjs/common"
import PostController from "./post.controller"
import PostService from "./post.service"
import { PostMySqlModule } from "@database"

@Module({
	imports: [PostMySqlModule],
	controllers: [PostController],
	providers: [PostService],
})
export default class PostModule {}