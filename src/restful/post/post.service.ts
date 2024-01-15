import { Injectable } from "@nestjs/common"
import { PostMySqlService } from "@database"
import { CreateRequestDto } from "./dto"
import { UserDto } from "@shared"

@Injectable()
export default class PostService {
	constructor(
    private readonly postMySqlService: PostMySqlService
	) {}

	async create(user: UserDto, body: CreateRequestDto) {  //: Promise<CreateResponseDto>
		try {
			const post: Partial<CreateRequestDto> = {
				...body,
				creatorId: user.userId,
				// postContents: body.postContents
			}
			return await this.postMySqlService.create(post)	
		} catch (error) {
			console.log(error)
		}
	}
}
