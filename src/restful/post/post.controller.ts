import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger"
import { CreateRequestDto, CreateResponseDto } from "./dto"
import { JwtAuthGuard, User } from "../shared"
import { UserDto } from "@shared"
import PostService from "./post.service"

@ApiTags("Post")
@Controller("api/post")
export default class PostController {
	constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateResponseDto })
  @UseGuards(JwtAuthGuard)
  @Post()
	async create(@User() user: UserDto, @Body() body: CreateRequestDto){
		return await this.postService.create(user, body)
	}
}
