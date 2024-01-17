import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import SectionEntity from "./section.entity"

@Injectable()
export default class SectionService {
	constructor(@InjectRepository(SectionEntity) private readonly sectionRepository: Repository<SectionEntity>) {}
    
	async create(section: Partial<SectionEntity>): Promise<SectionEntity> {
		const newSection = this.sectionRepository.create(section)
		return this.sectionRepository.save(newSection)
	}

	//trùng với db
	async findById(courseId: string): Promise<SectionEntity[]> {
		return this.sectionRepository.findBy({
			courseId
		})
	}

	async findAll(): Promise<SectionEntity[]> {
		return this.sectionRepository.find()
	}

	// async delete(courseId: string) {
	// 	return this.sectionRepository.findOneBy(courseId)
	// }
}
