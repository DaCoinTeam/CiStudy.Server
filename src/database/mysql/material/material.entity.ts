import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import CourseEntity from "../course/course.entity"

@Entity()
export class MaterialEntity { 
  @PrimaryGeneratedColumn("uuid")
  	materialId: string

  @Column()
  	materialUrl: string

  @Column({ name: "courseId" })
  	courseId: string

	// @ManyToOne(() => CourseEntity, (courseEntity) => courseEntity.materials)
	// @JoinColumn({ name: "courseId" })
	// 	course: CourseEntity
}
