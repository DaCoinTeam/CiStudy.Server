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
		authTokensRequested: boolean,
		clientId?: string
	): Promise<CreateResponseDto> {
		const post: Partial<PostDto> = {
			...body,
			creatorId: user.userId,
		}
		const created = await this.postMySqlService.create(post)
		return await this.tokenManagerService.generateResponse(
			user.userId,
			created,
			authTokensRequested,
			clientId,
		)
	}
}
