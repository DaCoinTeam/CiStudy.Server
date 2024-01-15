import { Module } from "@nestjs/common"
import PostLikeEntity from "./post-like.entity"
import PostLikeService from "./post-like.service"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
	imports: [TypeOrmModule.forFeature([PostLikeEntity])],
	providers: [PostLikeService],
	exports: [PostLikeService],
})
export default class PostLikeModule {}