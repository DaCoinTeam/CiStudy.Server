import { Controller, Get, Param } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { TokenService } from "./token.service"
import { TokensEntity } from "@database"

@ApiTags("Token")
@Controller("api/token")
export class TokenController {
	constructor(
        private readonly tokenService: TokenService,
	) { }

    @Get("getTokenByAddressAndChainId")
	async handleGetTokenByAddressAndChainId(
        @Param("tokenAddress") tokenAddress : string, 
        @Param("chainId") chainId : number
	): Promise<TokensEntity> {
		return await this.tokenService.processGetTokenByAddressAndChainId(tokenAddress, chainId)
	}
}