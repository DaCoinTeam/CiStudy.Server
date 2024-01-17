import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"

@Entity()
export class VideoEntity {
  @Column()
  	videoTitle: string

  @Column()
  	videoUrl: string

  @Column()
  	progress: number

  @Column({ name: "sectionId" })
  	sectionId: string

	// @ManyToOne(() => SectionEntity, (section) => section.video)
	// @JoinColumn({ name: "sectionId" })
	// 	section: SectionEntity
}
