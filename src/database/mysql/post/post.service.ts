import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeepPartial, Repository } from "typeorm"
import PostEntity from "./post.entity"

@Injectable()
export default class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
	  ) {}

	  async create(post: DeepPartial<PostEntity>): Promise<PostEntity> { // 
		const created = this.postRepository.create(post)
		return await this.postRepository.save(created)
	}
}