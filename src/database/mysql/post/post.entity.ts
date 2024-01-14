import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("post")
export default class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  	postId: string

  @Column({ type: "varchar", length: 500 })
  	title: string

  @Column({ type: "uuid", length: 36 })
  	creatorId: string

  @Column({ type: "uuid", length: 36  })
  	courseId: string

	// @ManyToOne(() => CourseEntity, (courseEntity) => courseEntity.posts)
	// @JoinColumn({ name: "courseId" })
	// 	course: CourseEntity
}
