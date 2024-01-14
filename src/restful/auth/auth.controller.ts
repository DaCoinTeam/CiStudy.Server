import {
	Body,
	Controller,
	Post,
	Get,
	UseGuards,
	Query,
} from "@nestjs/common"
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger"
import { RefreshResponseDto, SignUpRequestDto } from "./dto"
import UserService from "./auth.service"
import { SignUpGuard } from "./guards"
import { ClientId, JwtAuthGuard, User } from "../shared"
import { UserDto } from "@shared"

@ApiTags("Auth")
@Controller("api/auth")
export default class AuthController {
	constructor(private readonly userService: UserService) {}

  @UseGuards(SignUpGuard)
  @Post("sign-up")
	async signUp(@Body() body: SignUpRequestDto): Promise<string> {
		return await this.userService.signUp(body)
	}

  @ApiQuery({
  	name: "clientId",
  	example: "2306144d-f968-4072-93d8-2fc53f31b3e8",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("refresh")
  async refresh(
    @User() user: UserDto,
    @ClientId() clientId?: string,
  ): Promise<RefreshResponseDto> {
  	return await this.userService.refresh(user, clientId)
  }

  @Get("verify-registration")
  async verifyRegistration(@Query("token") token: string): Promise<string> {
  	return this.userService.verifyRegistration(token)
  }
}
