import { TokensMySQLService } from "@database"
import { Injectable, NotFoundException } from "@nestjs/common"
import { Address } from "web3"
import { PostRequestBodyApi } from "./swagger"

@Injectable()
export class TokenService {
	constructor(
        private readonly tokenMySQLService: TokensMySQLService,
	){
	}
    
	async processGetTokenByAddressAndChainId(tokenAddress: Address, chainId: number){
		const queryToken = await this.tokenMySQLService.findByAddressAndChainId(tokenAddress, chainId)
		if (queryToken == null) throw new NotFoundException("Token not found")
		return queryToken
	}

	async processCreateToken(body : PostRequestBodyApi){
		const createdToken = await this.tokenMySQLService.create(body)
		return createdToken
	}
}
