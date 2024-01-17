import { Injectable } from "@nestjs/common"
import PostContentEntity from "./post-content.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

@Injectable()
export default class PostContentService {
	constructor(@InjectRepository(PostContentEntity)
	 private readonly postContentRepository: Repository<PostContentEntity>) {}

	//  async create(body: Partial<PostContentEntity>): Promise<PostContentEntity> {
	// 	try {
	// 		const created = this.postContentRepository.create(body)			
	// 		return await this.postContentRepository.save(created)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }
}