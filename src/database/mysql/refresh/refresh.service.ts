import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import RefreshEntity from "./refresh.entity"

@Injectable()
export default class RefreshService {
	constructor(
    @InjectRepository(RefreshEntity)
    private refreshRepository: Repository<RefreshEntity>,
	) {}

	async createOrUpdate(
		refresh: Partial<RefreshEntity> & {
      clientId: string;
      userId: string;
    },
	): Promise<boolean> {
		try {
			const created = this.refreshRepository.create(refresh)

			const { clientId, userId } = refresh 

			const found = await this.refreshRepository.findOneBy({
				clientId,
				userId,
			})

			if (found) {
				created.refreshTokenId = found.refreshTokenId
			}
			console.log(created)
			await this.refreshRepository.save(created)
			return true
		} catch (ex) {
			return false
		}
	}

	async findByRefreshTokenId(
		refreshTokenId: string,
	): Promise<RefreshEntity | null> {
		return await this.refreshRepository.findOneBy({
			refreshTokenId,
		})
	}
	async findByClientIdAndUserId(
		clientId: string,
		userId: string,
	): Promise<RefreshEntity | null> {
		return await this.refreshRepository.findOneBy({
			clientId,
			userId,
		})
	}
}
