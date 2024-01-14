import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { CourseEntity } from "../course"
import { PostCommentEntity } from "../post-comment"
import { PostContentEntity } from "../post-content"

@Entity("post")
export default class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  	postId: string

  @Column({ type: "varchar", length: 600 })
  	title: string

  @Column({ type: "uuid", length: 36 })
  	creatorId: string

  @Column({ type: "uuid" })
  	courseId: string

  @ManyToOne(() => CourseEntity, (course) => course.posts)
  @JoinColumn({ name: "courseId" })
  	course: CourseEntity

  @OneToMany(() => PostCommentEntity, (comment) => comment.post)
  	comments: PostCommentEntity[]

  @OneToMany(() => PostContentEntity, (postContent) => postContent.post)
  	postContents: PostContentEntity[]
}
