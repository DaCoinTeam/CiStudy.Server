import {
	Body,
	Controller,
	Get,
	Headers,
	Post,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { UserMySqlEntity } from "@database"
import { SignUpDto } from "./dto"
import UserService from "./auth.service"
import { SignUpGuard } from "./guards"
import { SignUpInterceptor } from "./interceptors"
import utils from "@utils"

@ApiTags("Auth")
@Controller("api/auth")
export default class AuthController {
	constructor(private readonly userService: UserService) {}

  @UseGuards(SignUpGuard)
  @UseInterceptors(SignUpInterceptor)
  @Post("sign-up")
	async signUp(@Body() body: SignUpDto): Promise<UserMySqlEntity> {
		return await this.userService.signUp(body)
	}

  @Get("verify-google-access-token")
  async verifyGoogleAccessToken(
    @Headers("authorization") authorization: string,
  ): Promise<UserMySqlEntity> {
  	const accessToken = utils.extract.extractTokenFromAuthorization(authorization)
  	return await this.userService.verifyGoogleAccessToken(accessToken)
  }
}
