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
import { CreateRequestDto, createSchema } from "./dto"
import { AuthInterceptor, JwtAuthGuard, User } from "../shared"
import { UserDto } from "@shared"
import PostService from "./post.service"
import { FilesInterceptor } from "@nestjs/platform-express"

enum Demo {
  DEMO_1 = "DEMO_1",
  DEMO_2 = "DEMO_2",
}

@ApiTags("Post")
@Controller("api/post")
export default class PostController {
	constructor(private readonly postService: PostService) {}

  @ApiConsumes("multipart/form-data")
  @ApiBody({
  	description: "Course File",
  	schema: {
  		type: "object",
  		properties: {
  			postContents: {
  				type: "array",
  				items: {
  					type: "object",
  					properties: {
  						text: {
  							type: "string",
  						},
  						file: {
  							type: "string",
  							format: "binary",
  						},
  					},
  				},
  			},
  		},
  	},
  })
  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @ApiQuery({
  	name: "refresh",
  	example: "true",
  })
  @ApiBearerAuth()
  @UseInterceptors(AuthInterceptor)
  @Post()
  @UseInterceptors(FilesInterceptor("files"))
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthInterceptor)
  @Post()
	async create(
    @User() user: UserDto,
    @Body() body: CreateRequestDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
	) {
		console.log(files)
		//return await this.postService.create(user, body)
	}
}
