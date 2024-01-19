import {
	Controller,
	Post,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common"
import LectureService from "./lecture.service"
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiQuery,
	ApiTags,
} from "@nestjs/swagger"
import createSchema from "./schemas/create.schema"
import { AuthInterceptor, DataFromBody, User } from "../shared"
import { Files } from "@shared"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import CreateRequestDto from "./dto/request.dto"
import { JwtAuthGuard } from "src/graphql/shared"
import { UserMySqlEntity } from "@database"

@ApiTags("lecture")
@Controller("api/lecture")
export default class LectureController {
	constructor(private readonly lectureService: LectureService) {}

  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({ schema: createSchema })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
  	AuthInterceptor,
  	FileFieldsInterceptor([{ name: "files", maxCount: 5 }]),
  )
  @Post()
	create(
    @User() user: UserMySqlEntity,
    @DataFromBody() data: CreateRequestDto,
    @UploadedFiles() { files }: Files,
	) {
		// console.log(user)
		// console.log(data)
		// console.log(files)
		// return
		return this.lectureService.create(user, data, files)
	}
}
