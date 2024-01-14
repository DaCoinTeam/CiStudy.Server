import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import PostContentEntity from "./post-content.entity"
import PostContentService from "./post-content.service"

@Module({
	imports: [TypeOrmModule.forFeature([PostContentEntity])],
	providers: [PostContentService],
	exports: [PostContentService]
})
export default class PostContentModule {}
