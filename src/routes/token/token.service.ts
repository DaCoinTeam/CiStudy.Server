import { TokensMySQLService } from "@database"
import { Injectable, NotFoundException } from "@nestjs/common"
import { Address } from "web3"

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
}