import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeepPartial, Repository } from "typeorm"
import PostCommentEntity from "./post-comment.entity"

@Injectable()
export default class PostCommentService {
	constructor(
    @InjectRepository(PostCommentEntity)
    private readonly postCommentRepository: Repository<PostCommentEntity>,
	) {}

	async create(postComment: DeepPartial<PostCommentEntity>): Promise<PostCommentEntity> {
		const created = this.postCommentRepository.create(postComment)
		return await this.postCommentRepository.save(created)
	}
}
