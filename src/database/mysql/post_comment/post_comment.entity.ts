import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import PostEntity from "../post/post.entity"
import PostCommentContentEntity from "../post_comment_content/post_comment_content.entity"

@Entity("post_comment")
export class PostCommentEntity {
  @PrimaryGeneratedColumn("uuid")
  	postCommentId: string

    @Column({ type: "uuid", length: 36})
    	userId: string

    @Column({ type: "uuid", length: 36 })
    	postId: string

    @Column({ type: "varchar", length: 1000 })
    	content: string

    @Column({ type: "uuid", default: null, length: 36 })
    	fatherCommentId: string

    @ManyToOne(() => PostEntity, (post) => post.comments)
    @JoinColumn({ name: "postId" })
    	post: PostEntity

      @OneToMany( () => PostCommentContentEntity, (postCommentContent) => postCommentContent.postComment)
      	postCommentContents: PostCommentContentEntity[]
}