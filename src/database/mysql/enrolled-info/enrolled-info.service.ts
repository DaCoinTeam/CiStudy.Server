import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeepPartial, Repository } from "typeorm"
import EnrolledInfoEntity from "./enrolled-info.entity"

@Injectable()
export default class EnrolledInfoService {
	constructor(
    @InjectRepository(EnrolledInfoEntity)
    private readonly enrolledInfoRepository: Repository<EnrolledInfoEntity>,
	) {}

	async create(enrolledInfo: DeepPartial<EnrolledInfoEntity>) {
		const newEnrolledInfo = this.enrolledInfoRepository.create(enrolledInfo)
		return await this.enrolledInfoRepository.save(newEnrolledInfo)
	}
}
