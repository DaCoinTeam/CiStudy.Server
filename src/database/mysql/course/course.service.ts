import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import CourseEntity from "./course.entity"
import { DeepPartial, Repository } from "typeorm"

@Injectable()
export default class CourseService {
	constructor(
		@InjectRepository(CourseEntity) private readonly courseRepository: Repository<CourseEntity>,
	) {}
    
	async create(course: DeepPartial<CourseEntity>): Promise<CourseEntity> {
		const newCourse = this.courseRepository.create(course)
		return this.courseRepository.save(newCourse)
	}

	//trùng với db
	async findById(courseId: string): Promise<CourseEntity | null> {
		return this.courseRepository.findOneBy({
			courseId
		})
	}

	async findAll(): Promise<CourseEntity[]> {
		return this.courseRepository.find({ where: { isDeleted: false } })
	}

	async delete(courseId: string) {
		return this.courseRepository.update(courseId, { isDeleted: true })
	}
}
