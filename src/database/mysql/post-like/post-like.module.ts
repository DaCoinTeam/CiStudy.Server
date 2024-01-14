import { Module } from "@nestjs/common"
import PostLikeEntity from "./post-like.entity"

@Module({
	imports: [PostLikeEntity],
	providers: [],
	exports: [],
})
export default class PostLikeModule {}