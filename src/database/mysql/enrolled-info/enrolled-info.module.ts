import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import PostCommentService from "./enrolled-info.service"
import EnrolledInfoEntity from "./enrolled-info.entity"

@Module({
	imports: [TypeOrmModule.forFeature([EnrolledInfoEntity])],
	providers: [PostCommentService],
	exports: [PostCommentService]
})
export default class EnrolledInfoModule {}