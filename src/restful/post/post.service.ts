import { Injectable } from "@nestjs/common"
import { PostMySqlService } from "@database"
import { CreateRequestDto, CreateResponseDto } from "./dto"
import { PostDto, UserDto } from "@shared"
import { ResponseService, TokenManagerService } from "@global"
@Injectable()
export default class PostService {
	constructor(
    private readonly postMySqlService: PostMySqlService,
    private readonly tokenManagerService: TokenManagerService,
    private readonly responseService: ResponseService,
	) {}

	async create(
		user: UserDto,
		body: CreateRequestDto,
	): Promise<CreateResponseDto> {
		const post: Partial<PostDto> = {
			...body,
			creatorId: user.userId,
		}
		const created = await this.postMySqlService.create(post)
		return body.requestAuthTokens
			? await this.tokenManagerService.generateResponse(
				body.clientId,
				user.userId,
				created,
			)
			: await this.responseService.generateResponse(created)
	}
}
