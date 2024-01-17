import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"

import PostEntity from "../post/post.entity"
import EnrolledEntity from "../enrolled-info/enrolled-info.entity"

export enum VerifiedStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

interface CourseIncludes {
  time: number;
}

@Entity("course")
export default class CourseEntity {
  @PrimaryGeneratedColumn("uuid")
  	courseId: string

  @Column({
  	type: "varchar",
  	length: 1000,
  	default: null,
  })
  	title: string

  @Column({
  	type: "varchar",
  	length: 255,
  	default: null,
  })
  	thumbnailUrl: string

  @Column({ type: "varchar", length: 1000 })
  	description: string

  @Column({ type: "float", default: 0 })
  	price: number

  @Column({ type: "enum", enum: VerifiedStatus, default: null })
  	verifiedStatus: VerifiedStatus

  @Column({ default: true })
  	isDraft: boolean

  @Column({ type: "uuid", length: 36 })
  	creatorId: string

  @Column({ default: false })
  	isDeleted: boolean

  @Column({ type: "varchar", length: 255 })
  	previewVideoUrl: string

  @Column({ type: "varchar", length: 255, default: null })
  	targets: string


  @Column({ type: "json", default: null })
  	includes: CourseIncludes

  @OneToMany(() => PostEntity, (post) => post.course)
  	posts: PostEntity[]

	@OneToMany(() => EnrolledEntity, (enrolled) => enrolled.course)
  	enrolledInfos: EnrolledEntity[]
}
