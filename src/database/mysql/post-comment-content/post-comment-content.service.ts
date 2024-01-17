import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import PostCommentContentEntity from "./post-comment-content.entity"

@Injectable()
export default class PostCommentContentService {
	constructor(
		@InjectRepository(PostCommentContentEntity)
		private readonly postCommentContentRepository: Repository<PostCommentContentEntity>,
	) {}
	
	async create(postCommentContent: Partial<PostCommentContentEntity>): Promise<PostCommentContentEntity> {
		const created = this.postCommentContentRepository.create(postCommentContent)
		return await this.postCommentContentRepository.save(created)
	}
}