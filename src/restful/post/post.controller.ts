import {
	Body,
	Controller,
	Post,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common"
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiQuery,
	ApiTags,
} from "@nestjs/swagger"
import { CreateRequestDto, LikeRequestDto, UnlikeRequestDto } from "./dto"
import { AuthInterceptor, DataFromBody, User } from "../shared"
import { Files, UserMySqlDto } from "@shared"
import PostService from "./post.service"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { JwtAuthGuard } from "src/graphql/shared"
import { createSchema } from "./schemas"
import { MustEnrolledGuard } from "./guards"

@ApiTags("Post")
@Controller("api/post")
export default class PostController {
	constructor(private readonly postService: PostService) {}

	// post - create
  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({ schema: createSchema })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, MustEnrolledGuard)
  @UseInterceptors(
  	AuthInterceptor,
  	FileFieldsInterceptor([{ name: "files", maxCount: 5 }]),
  )
  @Post()
	async create(
    @User() user: UserMySqlDto,
    @DataFromBody() data: CreateRequestDto,
    @UploadedFiles() { files }: Files,
	) {
		return await this.postService.create(user, data, files)
	}

  //post - like
  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @ApiQuery({
  	name: "refresh",
  	example: "true",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, MustEnrolledGuard)
  @UseInterceptors(AuthInterceptor)
  @Post("like")
  async like(@User() user: UserMySqlDto, @Body() body: LikeRequestDto) {
  	return await this.postService.like(user, body)
  }

  //post - unlike
  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
@ApiQuery({
	name: "refresh",
	example: "true",
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, MustEnrolledGuard)
@UseInterceptors(AuthInterceptor)
@Post("unlike")
  async unlike(@User() user: UserMySqlDto, @Body() body: UnlikeRequestDto) {
  	return await this.postService.unlike(user, body)
  }
}
