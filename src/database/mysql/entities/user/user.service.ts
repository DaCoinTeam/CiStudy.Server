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

	async update(user: Partial<UserEntity>): Promise<boolean> {
		const userId = user.userId
		if (!userId) return false
		const result = await this.userRepository.update(userId, user)
		return !!result.affected
	}
}
