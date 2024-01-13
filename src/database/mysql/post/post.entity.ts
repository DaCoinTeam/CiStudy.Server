import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { CourseEntity } from "../course"

@Entity("post")
export default class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  	postId: string

  @Column({ type: "varchar", length: 500 })
  	title: string

  @Column({ type: "uuid" })
  	creatorId: string

  @Column({ type: "uuid" })
  	courseId: string

    //many to one, chiều dưới => cần join column
  @ManyToOne(() => CourseEntity, (course) => course.courseId)
  @JoinColumn({ name: "courseId" })
  	couse: CourseEntity
}