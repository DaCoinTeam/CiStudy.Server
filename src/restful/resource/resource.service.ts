import { Injectable, NotFoundException } from "@nestjs/common"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { ResourceMysqlEntity } from "@database"
import { UpdateResourceDto } from "./dto/update-resource.dto"
import { ResourceDto } from "./dto/resource.dto"
import LectureService from "../lecture/lecture.service"
import { FirebaseService } from "@global"

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceMysqlEntity)
    private readonly resourceMysqlRepository: Repository<ResourceMysqlEntity>,
    private readonly lectureService: LectureService,
    private readonly firebaseService: FirebaseService
  ) {}

  async create(resourceDto: ResourceDto, file: Express.Multer.File): Promise<ResourceDto> {
    const foundLecture = await this.lectureService.findById(resourceDto.lectureId)
    if(!foundLecture) throw new NotFoundException("Lecture is not exist!")

    // upload resource to firebase
    const resourceLink = await this.firebaseService.uploadFile(file.buffer, file.originalname)

    resourceDto.resourceLink = resourceLink
    return this.resourceMysqlRepository.save(resourceDto)
  }

  findAll() {
    return "This action returns all resource"
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    console.log(updateResourceDto)
    return `This action updates a #${id} resource`
  }

  remove(id: number) {
    return `This action removes a #${id} resource`
  }
}
