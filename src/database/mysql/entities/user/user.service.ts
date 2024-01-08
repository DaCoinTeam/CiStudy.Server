import { Injectable, Inject } from "@nestjs/common"
import { Repository } from "typeorm"
import UserEntity from "./user.entity"
import { USER_REPOSITORY } from "../../mysql.constant"

@Injectable()
export default class UserService {
	constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<UserEntity>,
	) {}

	async create(user: Partial<UserEntity>): Promise<UserEntity> {
		const created = this.userRepository.create(user)
		console.log(created)
		return await this.userRepository.save(created)
	}

	async findByUserId(userId: string): Promise<UserEntity | null> {
		return await this.userRepository.findOneBy({
			userId,
		})
	}


	async findByExternalId(externalId: string): Promise<UserEntity | null> {
		return await this.userRepository.findOneBy({
			externalId,
		})
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		return await this.userRepository.findOneBy({
			email,
		})
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
