import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import PostCommentEntity from "./post-comment.entity"
import PostCommentService from "./post-comment.service"
@Module({
	imports: [TypeOrmModule.forFeature([PostCommentEntity	])],
	providers: [PostCommentService],
	exports: [PostCommentService]
})
export default class PostCommentModule {}