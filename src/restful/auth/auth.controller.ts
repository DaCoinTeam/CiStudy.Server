import { Body, Controller, Post, Get, UseGuards, Query, UseInterceptors } from "@nestjs/common"
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger"
import { SignInRequestDto, SignUpRequestDto } from "./dto"
import UserService from "./auth.service"
import { SignUpGuard } from "./guards"
import { UserMySqlEntity } from "@database"
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
  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @Post("sign-in")
  @UseInterceptors(SignInInterceptor)
  async signIn(@Body() body: SignInRequestDto) {
  	return await this.userService.signIn(body)
  }

  //get - init
  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @ApiBearerAuth()
  @Get("init")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthInterceptor)
  async init(@User() user: UserMySqlEntity){
  	return await this.userService.init(user)
  }
}
