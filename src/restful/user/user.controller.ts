import {
	Body,
	Controller,
	Headers,
	Post,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { UserMySqlEntity } from "@database"
import { SignUpDto } from "./dto"
import UserService from "./user.service"
import { SignUpGuard } from "./guards"
import { SignUpInterceptor } from "./interceptors"
import utils from "@utils"

@ApiTags("User")
@Controller("api/user")
export default class UserController {
	constructor(private readonly userService: UserService) {}

  @UseGuards(SignUpGuard)
  @UseInterceptors(SignUpInterceptor)
  @Post("sign-up")
	async signUp(@Body() body: SignUpDto): Promise<UserMySqlEntity> {
		return await this.userService.signUp(body)
	}

  @Post("verify-google-access-token")
  async verifyGoogleAccessToken(
    @Headers() headers: Headers,
  ): Promise<UserMySqlEntity> {
  	const accessToken = utils.extract.extractTokenFromHeader(headers)
  	return await this.userService.verifyGoogleAccessToken(accessToken)
  }
}
