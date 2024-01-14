import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import SessionEntity from "./session.entity"

@Injectable()
export default class SessionService {
	constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
	) {}

	async createOrUpdate(
		session: Partial<SessionEntity> & {
      clientId: string;
      userId: string;
    },
	): Promise<boolean> {
		try {
			const created = this.sessionRepository.create(session)

			const { clientId, userId } = session
			const found = await this.sessionRepository.findOneBy({
				clientId,
				userId,
			})

			if (found) {
				created.sessionId = found.sessionId
			}

			await this.sessionRepository.save(created)
			return true
		} catch (ex) {
			return false
		}
	}

	async findBysessionId(sessionId: string): Promise<SessionEntity | null> {
		return await this.sessionRepository.findOneBy({
			sessionId,
		})
	}
	async findByUserIdAndClientId(
		userId: string,
		clientId: string,
	): Promise<SessionEntity | null> {
		return await this.sessionRepository.findOneBy({
			userId,
			clientId,
		})
	}
}
