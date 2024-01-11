import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CourseEntity } from '../course/course.entity';

@Entity()
export class MaterialEntity {
  @Column()
  materialUrl: string;

  @Column({ name: 'courseId' })
  courseId: string;

  @ManyToOne(() => CourseEntity, (courseEntity) => courseEntity.materials)
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;
}
