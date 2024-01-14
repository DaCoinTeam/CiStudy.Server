import { Body, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common"
import { ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags } from "@nestjs/swagger"
import { CreateRequestDto, CreateResponseDto } from "./dto"
import { AuthInterceptor, JwtAuthGuard, User } from "../shared"
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
  	name: "refresh",
  	example: "true"
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateResponseDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthInterceptor)
  @Post()
	async create(
    @User() user: UserDto,
    @Body() body: CreateRequestDto,
	) {
		return await this.postService.create(user, body)
	}
}
