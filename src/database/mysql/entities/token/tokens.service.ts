
import { Injectable, Inject } from "@nestjs/common"
import { Repository } from "typeorm"
import TokensEntity from "./tokens.entity"
import { Address } from "web3"
import { TOKENS_REPOSITORY } from "../../mysql.constant"

@Injectable()
export default class TokensService {
	constructor(
    @Inject(TOKENS_REPOSITORY)
    private tokensRepository: Repository<TokensEntity>,
	) {}

	async findAll(): Promise<TokensEntity[]> {
		return this.tokensRepository.find()
	}

	async findByAddressAndChainId(tokenAddress: Address, chainId: number): Promise<TokensEntity|null> {
		return this.tokensRepository.findOneBy(	
			{
				tokenAddress: tokenAddress,
				chainId: chainId
			},
		)
	}
}