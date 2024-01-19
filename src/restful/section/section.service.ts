import { SectionMySqlEnitiy } from "@database"
import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import CourseService from "../course/course.service"
import { plainToInstance } from "class-transformer"
import SectionDto from "./dto/section.dto"

@Injectable()
export default class SectionService {
  constructor(
    @InjectRepository(SectionMySqlEnitiy)
    private readonly sectionMysqlRepository: Repository<SectionMySqlEnitiy>,
    private readonly courseMysqlRepository: CourseService,
  ) {}

  async create(section: SectionDto): Promise<SectionDto> {
    const foundCourse = await this.courseMysqlRepository.findById(
      section.courseId,
    )
    if (!foundCourse) throw new NotFoundException("Course not exist!")
    const savedSection = this.sectionMysqlRepository.save(section)
    return plainToInstance(SectionDto, savedSection, {
      excludeExtraneousValues: true,
    })
  }

  async delete(sectionId: string) {
    const foundSection = await this.sectionMysqlRepository.findOne({ where: { sectionId } })
    if (!foundSection) throw new NotFoundException("Section not exist!")
    await this.sectionMysqlRepository.delete(sectionId)
  }

  async find(courseId: string): Promise<SectionDto[]> {
    const listSection = this.sectionMysqlRepository.find({ where: { courseId } })
    return listSection
  }
}
