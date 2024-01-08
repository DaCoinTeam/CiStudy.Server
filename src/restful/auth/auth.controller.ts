import {
	Body,
	Controller,
	Post,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { SignUpDto } from "./dto"
import UserService from "./auth.service"
import { SignUpGuard } from "./guards"
import { SignUpInterceptor } from "./interceptors"

@ApiTags("Auth")
@Controller("api/auth")
export default class AuthController {
	constructor(private readonly userService: UserService) {}

  @UseGuards(SignUpGuard)
  @UseInterceptors(SignUpInterceptor)
  @Post("sign-up")
	async signUp(@Body() body: SignUpDto): Promise<string> {
		return await this.userService.signUp(body)
	}
}
