import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CourseEntity } from '../course/course.entity';
import { VideoEntity } from '../video/video.entity';

@Entity()
export class SectionEntity {
  @Column()
  sectionName: string;

  @Column({ name: 'couseId' })
  couseId: string;

  @ManyToOne(() => CourseEntity, (courseEntity) => courseEntity.sections)
  @JoinColumn({ name: 'couseId' })
  course: CourseEntity;

  @OneToMany(() => VideoEntity, (videoEntity) => videoEntity.section)
  video: VideoEntity[];
}
