import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"
import SectionEntity from "./section.entity"
import { ContentType } from "./shared"


@Entity("lecture")
export default class LectureEntity {
  @PrimaryGeneratedColumn("uuid")
  	lectureId: string

  @Column({ type: "varchar", length: 150 })
  	lectureTitle: string

  @Column({ type: "varchar", length: 1000 })
  	content: string

  @Column({ type: "enum", enum: ContentType, default: ContentType.Text })
  	contentType: ContentType

  @Column({ name: "sectionId", type: "uuid", length: 36 })
  	sectionId: string

  @ManyToOne(() => SectionEntity, (section) => section.lecture)
  @JoinColumn({ name: "sectionId" })
  	section: SectionEntity
}
