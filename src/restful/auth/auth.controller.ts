import { Body, Controller, Post, Get, UseGuards, Query, UseInterceptors } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { SignInRequestDto, SignUpRequestDto } from "./dto"
import UserService from "./auth.service"
import { SignUpGuard } from "./guards"
import { UserMySqlDto } from "@shared"
import { AuthInterceptor, JwtAuthGuard, User } from "../shared"
import { SignInInterceptor, VerifyGoogleAccessTokenInterceptor }  from "./interceptors"

@ApiTags("Auth")
@Controller("api/auth")
export default class AuthController {
	constructor(private readonly userService: UserService) {}

  //post - sign-up
  @Post("sign-up")
  @UseGuards(SignUpGuard)
	async signUp(@Body() body: SignUpRequestDto) {
		return await this.userService.signUp(body)
	}

  //get - verify-registration
  @Get("verify-registration")
  async verifyRegistration(@Query("token") token: string) {
  	return this.userService.verifyRegistration({ token })
  }

  //get - verify-google-access-token
  @Get("verify-google-access-token")
  @UseInterceptors(VerifyGoogleAccessTokenInterceptor)
  async verifyGoogleAccessToken(@Query("token") token: string) {
  	return this.userService.verifyGoogleAccessToken({ token })
  }

  //post - sign-in
  @Post("sign-in")
  @UseInterceptors(SignInInterceptor)
  async signIn(@Body() body: SignInRequestDto) {
  	return await this.userService.signIn(body)
  }

  //get - init
  @Get("init")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthInterceptor)
  async init(@User() user: UserMySqlDto){
  	return await this.userService.init(user)
  }
}
