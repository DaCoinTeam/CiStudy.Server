
import { Injectable, Inject, BadRequestException, ConflictException } from "@nestjs/common"
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
	async create(entity: Partial<TokensEntity>): Promise<TokensEntity|null> {
		const tokenAddress = entity.tokenAddress
		const chainId = entity.chainId
		
		if (
			tokenAddress == undefined
			|| chainId == undefined
		) throw new BadRequestException("Token address and chain ID are required.")

		const queryEntity = await this.findByAddressAndChainId(tokenAddress, chainId)
		if (queryEntity != null)
			throw new ConflictException("A token with the same address and chain ID already exists.")

		const _entity = this.tokensRepository.create(entity)
		await this.tokensRepository.save(_entity)
		return _entity
	}
}
