import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import PostCommentContentEntity from "./post-comment-content.entity"
import PostCommentContentService from "./post-comment-content.service"

@Module({
	imports: [TypeOrmModule.forFeature([PostCommentContentEntity])],
	providers: [PostCommentContentService],
	exports: [PostCommentContentService],
})
export default class PostCommentContentModule {}
