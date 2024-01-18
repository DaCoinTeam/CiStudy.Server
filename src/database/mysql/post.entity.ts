import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import CourseEntity from "./course.entity"
import PostCommentEntity from "./post-comment.entity"
import PostContentEntity from "./post-content.entity"
import PostLikeEntity from "./post-like.entity"
import UserEntity from "./user.entity"

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

	  @ManyToOne(() => UserEntity, (user) => user.posts)
	  @JoinColumn({ name: "creatorId" })
		  creator: UserEntity

  @OneToMany(() => PostContentEntity, (postContent) => postContent.post, { cascade: true })
  	postContents: Partial<PostContentEntity>[]

  @OneToMany(() => PostCommentEntity, (postComment) => postComment.post)
  	postComments: PostCommentEntity[]

  @OneToMany(() => PostLikeEntity, (postLike) => postLike.post)
  	postLikes: PostLikeEntity[]
}
