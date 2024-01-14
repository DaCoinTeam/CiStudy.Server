import { Body, Controller, Post, Get, UseGuards, Query, UseInterceptors } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { SignInRequestDto, SignUpRequestDto, SignUpResponseDto } from "./dto"
import UserService from "./auth.service"
import { SignUpGuard } from "./guards"
import { UserDto } from "@shared"
import { AuthInterceptor, JwtAuthGuard, User } from "../shared"
import { SignInResponseDto } from "./dto/sign-in"

@ApiTags("Auth")
@Controller("api/auth")
export default class AuthController {
	constructor(private readonly userService: UserService) {}

  @UseGuards(SignUpGuard)
  @Post("sign-up")
	async signUp(@Body() body: SignUpRequestDto): Promise<SignUpResponseDto> {
		return await this.userService.signUp(body)
	}

  @Get("verify-registration")
  async verifyRegistration(@Query("token") token: string) {
  	return this.userService.verifyRegistration({ token })
  }

  @Get("verify-google-access-token")
  async verifyGoogleAccessToken(@Query("token") token: string) {
  	return this.userService.verifyGoogleAccessToken({ token })
  }

  @Post("sign-in")
  async signIn(@Body() body: SignInRequestDto) : Promise<SignInResponseDto> {
  	return await this.userService.signIn(body)
  }

  @Get("init")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthInterceptor)
  async init(@User() user: UserDto){
  	return await this.userService.init(user)
  }
}
