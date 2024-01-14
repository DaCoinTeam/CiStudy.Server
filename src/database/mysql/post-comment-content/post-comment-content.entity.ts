import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import { PostCommentEntity } from "../post-comment"

export enum ContentType {
  Text = "Text",
  Video = "Video",
  Code = "Code",
  Image = "Image",
  Label = "Label",
}

@Entity("post_comment_content")
export default class PostCommentContentEntity {
  @PrimaryGeneratedColumn("uuid")
  	postCommentContentId: string

  @Column({ type: "uuid", length: 36 })
  	postCommentId: string

  @Column({ type: "enum", enum: ContentType, default: ContentType.Text })
  	contentType: ContentType

  @Column({ type: "varchar", length: 1000 })
  	content: string

   @ManyToOne(
   	() => PostCommentEntity,
   	(postComment) => postComment.postCommentContents,
   )
   @JoinColumn({ name: "postCommentId" })
   	postComment: PostCommentEntity
}
