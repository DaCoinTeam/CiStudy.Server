import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { SectionEntity } from "../section/section.entity"

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

  @ManyToOne(() => SectionEntity, (sectionEntity) => sectionEntity.video)
  @JoinColumn({ name: "sectionId" })
  	section: SectionEntity
}
