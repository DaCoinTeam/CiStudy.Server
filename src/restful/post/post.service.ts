import { Injectable } from "@nestjs/common"
import { PostMySqlService } from "@database"
import { CreateRequestDto, CreateResponseDto } from "./dto"
import { PostDto, UserDto } from "@shared"

@Injectable()
export default class PostService {
	constructor(
    private readonly postMySqlService: PostMySqlService
	) {}

	async create(
		user: UserDto,
		body: CreateRequestDto
	): Promise<CreateResponseDto> {
		const post: Partial<PostDto> = {
			...body,
			creatorId: user.userId,
		}
		return await this.postMySqlService.create(post)	
	}
}
