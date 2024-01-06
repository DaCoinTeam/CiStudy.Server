import { Body, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { UserMySqlEntity } from "@database"
import { SignInRequestBody, SignUpRequestBody } from "./bodies"
import UserService from "./user.service"
import { SignInGuard, SignUpGuard } from "./guards"
import { SignInInterceptor, SignUpInterceptor } from "./interceptors"

@ApiTags("User")
@Controller("api/user")
export default class UserController {
	constructor(
        private readonly userService: UserService,
	) { }

    @UseGuards(SignInGuard)
    @UseInterceptors(SignInInterceptor)
    @Post("sign-in")
	async signIn(
        @Body() body: SignInRequestBody
	): Promise<UserMySqlEntity> {
		return await this.userService.signIn(body)
	}

    @UseGuards(SignUpGuard)
    @UseInterceptors(SignUpInterceptor)
    @Post("sign-up")
    async signUp(
        @Body() body: SignUpRequestBody
    ): Promise<UserMySqlEntity> {
    	return await this.userService.signUp(body)
    }

}