
import { Injectable, Inject } from "@nestjs/common"
import { Repository } from "typeorm"
import UserEntity from "./user.entity"
import { USER_REPOSITORY } from "../../mysql.constant"

@Injectable()
export default class TokensService {
	constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<UserEntity>,
	) {}

	
	async create(): Promise<UserEntity> {
		const user = this.userRepository.create()
		return await this.userRepository.save(user)
	}

	// async findByAddressAndChainId(tokenAddress: Address, chainId: number): Promise<TokensEntity|null> {
	// 	return this.tokensRepository.findOneBy(	
	// 		{
	// 			tokenAddress: tokenAddress,
	// 			chainId: chainId
	// 		},
	// 	)
	// }
	// async create(entity: Partial<TokensEntity>): Promise<TokensEntity|null> {
	// 	const tokenAddress = entity.tokenAddress
	// 	const chainId = entity.chainId
		
	// 	if (
	// 		tokenAddress == undefined
	// 		|| chainId == undefined
	// 	) throw new BadRequestException("Token address and chain ID are required.")

	// 	const queryEntity = await this.findByAddressAndChainId(tokenAddress, chainId)
	// 	if (queryEntity != null)
	// 		throw new ConflictException("A token with the same address and chain ID already exists.")

	// 	const _entity = this.tokensRepository.create(entity)
	// 	await this.tokensRepository.save(_entity)
	// 	return _entity
	// }
}
