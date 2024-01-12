import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import CourseEntity from "./course.entity"
import { Repository } from "typeorm"

@Injectable()
export default class CoursesService {
	constructor(@InjectRepository(CourseEntity) private readonly courseRepository: Repository<CourseEntity>) {}
    
	create(course: Partial<CourseEntity>): Promise<CourseEntity> {
		const newCourse = this.courseRepository.create(course)
		return this.courseRepository.save(newCourse)
	}

	findById(id: string): Promise<CourseEntity> {
		return this.courseRepository.findOneOrFail({ where:  {
			courseId: id
		} })
	}

	findAll(): Promise<CourseEntity[]> {
		return this.courseRepository.find()
	}
}
