import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags } from "@nestjs/swagger"
import { CreateRequestDto, CreateResponseDto } from "./dto"
import { AuthTokensRequested, ClientId, JwtAuthGuard, User } from "../shared"
import { UserDto } from "@shared"
import PostService from "./post.service"

@ApiTags("Post")
@Controller("api/post")
export default class PostController {
	constructor(private readonly postService: PostService) {}

  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935"
  })
  @ApiQuery({
  	name: "authTokensRequested",
  	example: "true"
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateResponseDto })
  @UseGuards(JwtAuthGuard)
  @Post()
	async create(
    @User() user: UserDto,
    @Body() body: CreateRequestDto,
    @AuthTokensRequested() authTokensRequested: boolean,
    @ClientId() clientId?: string,
	) {
		return await this.postService.create(user, body, authTokensRequested, clientId)
	}
}
