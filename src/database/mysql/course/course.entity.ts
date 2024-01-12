import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
} from "typeorm"
import { MaterialEntity } from "../material"
import { SectionEntity } from "../section"
import { TopicEntity } from "../topic/topic.entity"
import UserEntity from "../user/user.entity"

export enum verifyStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

@Entity("course")
export class CourseEntity {
  @Column()
  	title: string

  @Column()
  	description: string

  @Column()
  	price: number

  @Column({ type: "enum", enum: verifyStatus, default: verifyStatus.Pending })
  	verifyStatus: verifyStatus

  @Column({ default: true })
  	isDraft: boolean

  @Column({ default: false })
  	isPublished: boolean

  @Column({ name: "studentId" })
  	studentId: string

  @Column({ name: "creatorId" })
  	creatorId: string

  // --- relations ---

  // student
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userId)
  @JoinColumn({ name: "studentId" })
  	student: UserEntity

  // creator
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userId)
  @JoinColumn({ name: "creatorId" })
  	creator: UserEntity

  // material
  @OneToMany(() => MaterialEntity, (material) => material.course, {
  	onDelete: "CASCADE",
  })
  	materials: MaterialEntity[]

  // section
  @OneToMany(() => SectionEntity, (section) => section.course, {
  	onDelete: "CASCADE"
  })
  	sections: SectionEntity[]

  // topic
  @ManyToMany(() => TopicEntity, (topicEntity) => topicEntity.courses)
  @JoinTable({
  	name: "course_topic_mapping",
  	joinColumn: {
  		name: "courseId",
  		referencedColumnName: "id"  
  	},
  	inverseJoinColumn: {
  		name: "topicId",
  		referencedColumnName: "id"
  	}
  })
  	topics: TopicEntity[]
}
