import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { TokenService } from "./token.service"
import { TokensEntity } from "@database"
import { PostRequestBodyApi } from "./swagger"
import { PostGuard } from "./guards"

@ApiTags("Token")
@Controller("api/token")
export class TokenController {
	constructor(
        private readonly tokenService: TokenService,
	) { }

    @Get()
	async handleGetTokenByAddressAndChainId(
        @Query("tokenAddress") tokenAddress : string, 
        @Query("chainId") chainId : number
	): Promise<TokensEntity> {
		console.log(tokenAddress)
		return await this.tokenService.processGetTokenByAddressAndChainId(tokenAddress, chainId)
	}

    @UseGuards(PostGuard)
    @Post()
    async handleCreateToken(
        @Body() body: PostRequestBodyApi
    ): Promise<TokensEntity> {
    	return await this.tokenService.processCreateToken(body)
    }
}