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
import { CreateRequestDto, LikeRequestDto, UnlikeRequestDto, CommentRequestDto, ReplyCommentRequestDto, UpdateRequestDto } from "./dto"
import { AuthInterceptor, DataFromBody, User } from "../shared"
import { Files } from "@shared"
import PostService from "./post.service"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { JwtAuthGuard } from "src/graphql/shared"
import { createSchema, commentSchema, replyCommentSchema, updateSchema } from "./schemas"
import { MustEnrolledGuard } from "./guards"
import { UserMySqlEntity } from "@database"

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
  @Post("/create")
	async create(
    @User() user: UserMySqlEntity,
    @DataFromBody() data: CreateRequestDto,
    @UploadedFiles() { files }: Files,
	) {
    
		return await this.postService.create(user, data, files)
	}

  	// post - update
    @ApiQuery({
    	name: "clientId",
    	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
    })
    @ApiConsumes("multipart/form-data")
    @ApiBody({ schema: updateSchema })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, MustEnrolledGuard)
    @UseInterceptors(
    	AuthInterceptor,
    	FileFieldsInterceptor([{ name: "files", maxCount: 5 }]),
    )
    @Post("/update")
  async update(
      @User() user: UserMySqlEntity,
      @DataFromBody() data: UpdateRequestDto,
      @UploadedFiles() { files }: Files,
  ) {
  	return await this.postService.update(user, data, files)
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
    async like(@User() user: UserMySqlEntity, @Body() body: LikeRequestDto) {
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
  async unlike(@User() user: UserMySqlEntity, @Body() body: UnlikeRequestDto) {
  	return await this.postService.unlike(user, body)
  }

  // comment
  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
@ApiConsumes("multipart/form-data")
@ApiBody({ schema: commentSchema})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, MustEnrolledGuard)
@UseInterceptors(
	AuthInterceptor,
	FileFieldsInterceptor([{ name: "files", maxCount: 5 }]),
)
@Post("comment")
  async comment(
  @User() user: UserMySqlEntity,
  @DataFromBody() data: CommentRequestDto,
  @UploadedFiles() { files }: Files,
  ) {
	  return await this.postService.comment(user, data, files)
  }

  // reply comment
  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
@ApiConsumes("multipart/form-data")
@ApiBody({ schema: replyCommentSchema})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, MustEnrolledGuard)
@UseInterceptors(
	AuthInterceptor,
	FileFieldsInterceptor([{ name: "files", maxCount: 5 }]),
)
@Post("reply-comment")
  async replyComment(
  @User() user: UserMySqlEntity,
  @DataFromBody() data: ReplyCommentRequestDto,
  @UploadedFiles() { files }: Files,
  ) {
	  return await this.postService.replyComment(user, data, files)
  }
}
