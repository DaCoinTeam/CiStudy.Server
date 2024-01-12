import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import CourseEntity from "./course.entity"
import { Repository } from "typeorm"

@Injectable()
export default class CourseService {
	constructor(@InjectRepository(CourseEntity) private readonly courseRepository: Repository<CourseEntity>) {}
    
	create(course: Partial<CourseEntity>): Promise<CourseEntity> {
		const newCourse = this.courseRepository.create(course)
		return this.courseRepository.save(newCourse)
	}

	//trùng với db
	findById(courseId: string): Promise<CourseEntity | null> {
		return this.courseRepository.findOneBy({
			courseId
		})
	}

	findAll(): Promise<CourseEntity[]> {
		return this.courseRepository.find()
	}
}
