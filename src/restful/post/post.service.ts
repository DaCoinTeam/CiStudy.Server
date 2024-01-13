import { Injectable } from "@nestjs/common"
import { PostMySqlService } from "@database"
import { CreateRequestDto, CreateResponseDto } from "./dto"
@Injectable()
export default class PostService {
	constructor(private readonly postMySqlService: PostMySqlService) {}

	async create(user: UserDto, body: CreateRequestDto): Promise<CreateResponseDto> {
        body.
		return this.postMySqlService.create(body)
	}
}