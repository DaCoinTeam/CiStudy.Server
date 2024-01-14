import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import PostEntity from "./post.entity"

@Injectable()
export default class PostService {
	constructor(@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>) {}

	async create(post: Partial<PostEntity>): Promise<PostEntity> {
		const created = this.postRepository.create(post)
		console.log(created)
		return await this.postRepository.save(created)
	}

	async findByPostId(postId: string): Promise<PostEntity | null> {
		return await this.postRepository.findOneBy({
			postId,
		})
	}

	async update(post: Partial<PostEntity> & {
        postId: string
    }): Promise<boolean> {
		const postId = post.postId
		if (!postId) return false
		const result = await this.postRepository.update(postId, post)
		return !!result.affected
	}
}
