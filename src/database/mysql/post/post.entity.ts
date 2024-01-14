import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CourseEntity } from "../course"
import { PostCommentEntity } from "../post_comment/post_comment.entity"
import PostContentEntity from "../post_content/post_content.entity"

@Entity("postes")
export default class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  	postId: string

  @Column({ type: "varchar", length: 600 })
  	title: string

  @Column({ type: "uuid", length: 36 })
  	creatorId: string

  @Column({ type: "uuid", length: 36})
    courseId: string

  @ManyToOne(() => CourseEntity, (course) => course.posts)
    course: CourseEntity

  @OneToMany(() => PostCommentEntity, (comment) => comment.post)
  	comments: PostCommentEntity[]

  @OneToMany( () => PostContentEntity, (postContent) => postContent.post)
  	postContents: PostContentEntity[]
}
