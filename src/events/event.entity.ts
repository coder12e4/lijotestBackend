import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Submission } from '../submissions/submission.entity';

@Entity()
export class Event {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ nullable: true })
  details: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.events, {
    onDelete: 'CASCADE',
  })
  createdBy: User;

  @OneToMany(() => Submission, submission => submission.event)
  submissions: Submission[];
}
