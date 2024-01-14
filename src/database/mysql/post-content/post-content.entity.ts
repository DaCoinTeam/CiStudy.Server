import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import { ContentType } from "../post-comment-content"
import { PostEntity } from "../post"

@Entity("post_content")
export default class PostContentEntity {
  @PrimaryGeneratedColumn("uuid")
  	postContentId: string

  @Column({ type: "int", default: 0 })
  	index: number

  @Column({ type: "varchar", length: 1000 })
  	content: string

  @Column({ type: "enum", enum: ContentType, default: ContentType.Text })
  	contentType: ContentType

  @Column({ type: "uuid", length: 36 })
  	postId: string

  @ManyToOne(() => PostEntity, (post) => post.postContents)
  @JoinColumn({ name: "postId" })
  	post: PostEntity
}
