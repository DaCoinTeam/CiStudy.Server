import { DeepPartial, Repository } from "typeorm"
import {
  CourseMySqlEntity,
  EnrolledInfoMySqlEntity,
  UserMySqlEntity,
} from "@database"
import { Injectable, StreamableFile } from "@nestjs/common"
import { CourseDto, EnrollRequestDto } from "./dto"
import { FirebaseService, VideoStreamerService } from "@global"
import { Response } from "express"
import { InjectRepository } from "@nestjs/typeorm"
import { plainToInstance } from "class-transformer"

@Injectable()
export default class CourseService {
  constructor(
    @InjectRepository(CourseMySqlEntity) private readonly courseMySqlRepository: Repository<CourseMySqlEntity>,
    @InjectRepository(EnrolledInfoMySqlEntity) private readonly enrolledInfoMySqlRepository: Repository<EnrolledInfoMySqlEntity>,
    private readonly firebaseSerive: FirebaseService,
    private readonly videoStreamerService: VideoStreamerService,
  ) {}

  async create(
    user: UserMySqlEntity,
    files: {
      thumbnailUrl?: Express.Multer.File[];
      previewVideoUrl?: Express.Multer.File[];
    },
    body: CourseDto,
  ): Promise<CourseDto | null> {
    const promises: Promise<void>[] = []
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
    const savedCourse = await this.courseMySqlRepository.save(body)
    return plainToInstance(CourseDto, savedCourse, { excludeExtraneousValues: true })
    return savedCourse
  }

  async findById(courseId: string): Promise<CourseDto> {
    return await this.courseMySqlRepository.findOneBy({ courseId })
  }

  async findAll(): Promise<CourseDto[]> {
    return await this.courseMySqlRepository.find()
  }

  async delete(courseId: string) {
    return await this.courseMySqlRepository.delete(courseId)
  }

  async streamPreview(
    courseId: string,
    range: string,
    res: Response,
  ): Promise<StreamableFile> {
    const course = await this.courseMySqlRepository.findOneBy({ courseId })
    return this.videoStreamerService.getStreamableVideo(
      course.previewVideoUrl,
      range,
      res,
    )
  }

  async enroll(user: UserMySqlEntity, body: EnrollRequestDto) {
    const enrolledInfo: DeepPartial<EnrolledInfoMySqlEntity> = {
      userId: user.userId,
      ...body,
    }
    const created = await this.enrolledInfoMySqlRepository.save(enrolledInfo)
    return `Enroll successfully with id ${created.enrolledId}`
  }
}
