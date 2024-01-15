import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import PostEntity from "./post.entity"
import CreatePostDto from "src/restful/post/dto/create/request.dto"

@Injectable()
export default class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
	  ) {}

	  async create(createPostDto: Partial<CreatePostDto>): Promise<PostEntity> { // 

		const postContents = createPostDto.postContents.map((postContent) => {
			return {
				...postContent
			}
		})
		createPostDto.postContents = postContents
		return await this.postRepository.save(createPostDto)
	}

	// async findByPostId(postId: string): Promise<PostEntity | null> {
	// 	return await this.postRepository.findOneBy({
	// 		postId,
	// 	})
	// }

	// async update(post: Partial<PostEntity> & {
    //     postId: string
    // }): Promise<boolean> {
	// 	const postId = post.postId
	// 	if (!postId) return false
	// 	const result = await this.postRepository.update(postId, post)
	// 	return !!result.affected
	// }
}

