import { LectureMysqlEntity } from "@database"
import { Injectable, NotFoundException } from "@nestjs/common"
import LectureDto from "./dto/lecture.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { FirebaseService } from "@global"
import SectionService from "../section/section.service"

@Injectable()
export default class LectureService {
  constructor(
    @InjectRepository(LectureMysqlEntity)
    private readonly lectureMysqlRepository: Repository<LectureMysqlEntity>,
    private readonly firebaseService: FirebaseService,
    private readonly sectionService: SectionService,
  ) {}

  async create(body: LectureDto, file: Express.Multer.File) {
    const foundSection = await this.sectionService.findById(body.sectionId)
    if (!foundSection) throw new NotFoundException("Section not exist!")

    // upload video to firebase
    const { buffer, originalname } = file
    const videoUrl = await this.firebaseService.uploadFile(
      buffer,
      originalname,
    )

    body.video = videoUrl
    return this.lectureMysqlRepository.save(body)
  }

  async findById(lectureId: string): Promise<LectureDto> {
    return await this.lectureMysqlRepository.findOne({ where: { lectureId } })
  }
}
