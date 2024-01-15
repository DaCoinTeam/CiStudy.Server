import { CourseMySqlService } from "@database"
import { Injectable } from "@nestjs/common"
import { CreateReponseDto, CreateRequestDto } from "./dto"
import { UserMySqlDto } from "@shared"
import { FirebaseService } from "@global"

@Injectable()
export default class CourseService {
	constructor(
    private readonly courseMySqlService: CourseMySqlService,
    private readonly firebaseSerive: FirebaseService,
	) {}

	async create(
		user: UserMySqlDto,
		files: {
      thumbnailUrl?: Express.Multer.File[];
      previewVideoUrl?: Express.Multer.File[];
    },
		body: CreateRequestDto,
	): Promise<CreateReponseDto | null> {
		const promises : Promise<void>[] = []
		const thumbnailPromise = async () => {
			if (files.thumbnailUrl && files.thumbnailUrl[0]) {
				const url = await this.firebaseSerive.uploadFile(
					files.thumbnailUrl[0].buffer,
					files.thumbnailUrl[0].mimetype.split("/")[1],
				)
				body.thumbnailUrl = url
			}
		}
		promises.push(thumbnailPromise())
		const previewVideoUrlPromise = async () => {
			if (files.previewVideoUrl && files.previewVideoUrl[0]) {
				const url = await this.firebaseSerive.uploadFile(
					files.previewVideoUrl[0].buffer,
					files.previewVideoUrl[0].mimetype.split("/")[1],
				)
				body.previewVideoUrl = url
			}
		}
		promises.push(previewVideoUrlPromise())
		await Promise.all(promises)

		body.creatorId = user.userId
		return await this.courseMySqlService.create(body)
	}

	async findById(courseId: string): Promise<CreateReponseDto> {
		return await this.courseMySqlService.findById(courseId)
	}

	async findAll(): Promise<CreateReponseDto[]> {
		return await this.courseMySqlService.findAll()
	}

	async delete(courseId: string) {
		return await this.courseMySqlService.delete(courseId)
	}
}
