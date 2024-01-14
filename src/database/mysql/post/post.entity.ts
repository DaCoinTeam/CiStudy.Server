import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import CourseEntity from "../course/course.entity"
import PostCommentEntity from "../post-comment/post-comment.entity"
import PostContentEntity from "../post-content/post-content.entity"

@Entity("post")
export default class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  	postId: string

  @Column({ type: "varchar", length: 600 })
  	title: string

  @Column({ type: "uuid", length: 36 })
  	creatorId: string

  @Column({ type: "uuid", length: 36 })
  	courseId: string

  @ManyToOne(() => CourseEntity, (course) => course.posts)
  @JoinColumn({ name: "courseId" })
  	course: CourseEntity

  @OneToMany(() => PostContentEntity, (postContent) => postContent.post)
  	postContents: PostContentEntity[]

  @OneToMany(() => PostCommentEntity, (postComment) => postComment.post)
  	postComments: PostCommentEntity[]
}
