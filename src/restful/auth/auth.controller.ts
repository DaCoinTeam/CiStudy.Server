import {
	Body,
	Controller,
	Post,
	Get,
	UseGuards,
	UseInterceptors,
	Query,
} from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { RefreshResponseDto, SignUpRequestDto } from "./dto"
import UserService from "./auth.service"
import { SignUpGuard } from "./guards"
import { SignUpInterceptor } from "./interceptors"
import { JwtAuthGuard, User } from "../shared"
import { UserDto } from "@shared"

@ApiTags('Auth')
@Controller('api/auth')
export default class AuthController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(SignUpGuard)
  @UseInterceptors(SignUpInterceptor)
  @Post('sign-up')
  async signUp(@Body() body: SignUpRequestDto): Promise<string> {
    return await this.userService.signUp(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  async refresh(@User() user: UserDto): Promise<RefreshResponseDto> {
  	return this.userService.refresh(user)
  }

  @Get("verify-registration")
	async verifyRegistration(@Query("token") token: string) : Promise<string> {
		return this.userService.verifyRegistration(token)
	}
}
