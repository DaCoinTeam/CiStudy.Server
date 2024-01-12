import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import UserEntity from "./user.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export default class UserService {
	constructor(
    @InjectRepository(UserEntity)
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
