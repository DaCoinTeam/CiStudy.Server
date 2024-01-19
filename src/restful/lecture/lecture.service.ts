import { LectureMysqlEntity, UserMySqlEntity } from "@database"
import { Injectable } from "@nestjs/common"
import CreateRequestDto from "./dto/request.dto"
import { InjectRepository } from "@nestjs/typeorm"
import LectureEntity from "src/database/mysql/lecture.entity"
import { Repository } from "typeorm"


@Injectable()
export default class LectureService {
	constructor(@InjectRepository(LectureMysqlEntity) private readonly lectureMysqkRepository: Repository<LectureEntity>) {}

	async create(user: UserMySqlEntity, data: CreateRequestDto, files: Express.Multer.File[]) {
		console.log(files)
		console.log(data)
		// const lecture = {
		// 	...data,
		// 	userId: user.id,
		// }
		return
		// return this.lectureMysqlService.create(lecture)
	}
}