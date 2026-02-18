import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Event } from '../events/event.entity';
import { SubmissionStatus } from '../common/enums/submission-status.enum';

@Entity()
export class Submission {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  place: string;

  @Column()
  blood_group: string;

  @Column()
  photo: string;

  @Column()
  contact: string;

  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    default: SubmissionStatus.PENDING,
  })
  status: SubmissionStatus;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Event, event => event.submissions, {
    onDelete: 'CASCADE',
  })
  event: Event;
}
