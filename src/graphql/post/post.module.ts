import { Module } from "@nestjs/common"
import PostResolvers from "./post.resolvers"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
	PostMySqlEntity,
	PostLikeMySqlEntity,
	PostContentMySqlEntity,
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
	providers: [PostResolvers],
})
export default class PostGraphQLModule {}
