import {
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { MaterialEntity } from "../material"
import { SectionEntity } from "../section"
import { TopicEntity } from "../topic/topic.entity"
import UserEntity from "../user/user.entity"
import PostEntity from "../post/post.entity"

export enum VerifyStatus {
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

  @Column({ type: "enum", enum: VerifyStatus, default: null })
  	verifyStatus: VerifyStatus

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

	// --- relations ---

	//student
	//   @ManyToOne(() => UserEntity, (userEntity) => userEntity.userId)
	//   @JoinColumn({ name: "studentId" })
	//   	student: UserEntity

	// creator
	//   @ManyToOne(() => UserEntity, (userEntity) => userEntity.userId)
	//   @JoinColumn({ name: "creatorId" })
	//   	creator: UserEntity

	// material
	//   @OneToMany(() => MaterialEntity, (material) => material.course, {
	//   	onDelete: "CASCADE",
	//   })
	//   	materials: MaterialEntity[]

	// section
	//   @OneToMany(() => SectionEntity, (section) => section.course, {
	//   	onDelete: "CASCADE",
	//   })
	//   	sections: SectionEntity[]

	// topic
	//   @ManyToMany(() => TopicEntity, (topicEntity) => topicEntity.courses)
	//   @JoinTable({
	//   	name: "course_topic_mapping",
	//   	joinColumn: {
	//   		name: "courseId",
	//   		referencedColumnName: "id",
	//   	},
	//   	2inverseJoinColumn: {
	//   		name: "topicId",
	//   		referencedColumnName: "id",
	//   	},
	//   })
	//   	topics: TopicEntity[]
}
