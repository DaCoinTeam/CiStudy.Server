import {
	Body,
	Controller,
	Post,
	Get,
	UseGuards,
	Query,
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { SignUpRequestDto } from "./dto"
import UserService from "./auth.service"
import { SignUpGuard } from "./guards"

@ApiTags("Auth")
@Controller("api/auth")
export default class AuthController {
	constructor(private readonly userService: UserService) {}

  @UseGuards(SignUpGuard)
  @Post("sign-up")
	async signUp(@Body() body: SignUpRequestDto): Promise<string> {
		return await this.userService.signUp(body)
	}

  @Get("verify-registration")
  async verifyRegistration(@Query("token") token: string): Promise<string> {
  	return this.userService.verifyRegistration(token)
  }
}
