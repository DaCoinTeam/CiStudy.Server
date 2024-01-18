import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import CourseEntity from "./course.entity"

@Entity("section")
export default class SectionEntity {
  @PrimaryGeneratedColumn("uuid")
  	sectionId: string

  @Column()
  	sectionName: string

  @Column({ name: "courseId" })
  	courseId: string

//   @ManyToOne(() => CourseEntity, (courseEntity) => courseEntity.sections)
//   @JoinColumn({ name: "courseId" })
//   	course: CourseEntity

	// @OneToMany(() => VideoEntity, (videoEntity) => videoEntity.section)
	// 	video: VideoEntity[]
}
