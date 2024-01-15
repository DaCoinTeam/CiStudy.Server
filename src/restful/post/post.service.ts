import { Injectable } from "@nestjs/common"
import { PostMySqlService } from "@database"
import { CreateRequestDto } from "./dto"
import { PostDto, UserDto } from "@shared"

@Injectable()
export default class PostService {
	constructor(
    private readonly postMySqlService: PostMySqlService
	) {}

	async create(user: UserDto, body: CreateRequestDto) {  //: Promise<CreateResponseDto>
		try {
			const post: Partial<PostDto> = {
				...body,
				postContents: body.postContents.map((postContent, index) => ({
					index,
					...postContent,
				})),
				creatorId: user.userId,
				// postContents: body.postContents
			}

			console.log(body.postContents.map((postContent, index) => ({
				index,
				...postContent,
			})))

			return await this.postMySqlService.create(post)	
		} catch (error) {
			console.log(error)
		}
	}
}