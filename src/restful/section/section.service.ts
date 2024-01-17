import { SectionMysqlService } from "@database"
import { BadRequestException, Injectable } from "@nestjs/common"
import { SectionDto } from "./dto/section.dto"
import SectionEntity from "src/database/mysql/section/section.entity"

@Injectable()
export class SectionService {
	constructor(private readonly sectionMysqlService: SectionMysqlService) {}

	async create(body: SectionDto): Promise<SectionDto> {
		const listSection = await this.findById(body.courseId)
		if (listSection.length) {
			listSection.forEach((element) => {
				if (element.sectionName === body.sectionName) {
					throw new BadRequestException("Error", "Section name is existed!")
				}
			})
		}
		return this.sectionMysqlService.create(body)
	}

	async findById(courseId: string): Promise<SectionEntity[]> {
		return this.sectionMysqlService.findById(courseId)
	}
}
