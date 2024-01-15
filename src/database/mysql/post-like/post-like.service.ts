import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import PostLikeEntity from "./post-like.entity"
import { DeepPartial, Repository } from "typeorm"

@Injectable()
export default class PostLikeService {
	constructor(
    @InjectRepository(PostLikeEntity)
    private readonly postLikeRepository: Repository<PostLikeEntity>,
	) {}

	async findByPostLikeId(postLikeId: string) {
		try {
			return await this.postLikeRepository.findOneBy({
				postLikeId,
			})
		} catch (ex) {
			return null
		}
	}

	async findByUserIdAndPostId(userId: string, postId: string) {
		try {
			return await this.postLikeRepository.findOneBy({
				userId,
				postId,
			})
		} catch (ex) {
			return null
		}
	}

	async create(postLike: DeepPartial<PostLikeEntity>) {
		try {
			const created = this.postLikeRepository.create(postLike)
			return await this.postLikeRepository.save(created)
		} catch (ex) {
			return null
		}
	}

	async update(postLike: DeepPartial<PostLikeEntity>): Promise<boolean> {
		try {
			const updatedResult = await this.postLikeRepository.update(
				postLike.postLikeId,
				postLike,
			)
			return updatedResult.affected > 0
		} catch (ex) {
			return false
		}
	}
}
