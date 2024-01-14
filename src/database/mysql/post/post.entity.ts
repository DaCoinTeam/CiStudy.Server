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

	// @ManyToOne(() => CourseEntity, (courseEntity) => courseEntity.posts)
	// @JoinColumn({ name: "courseId" })
	// 	course: CourseEntity
}
