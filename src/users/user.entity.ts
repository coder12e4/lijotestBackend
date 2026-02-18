import { Entity, PrimaryGeneratedColumn, Column,  CreateDateColumn, OneToMany,} from 'typeorm';
import { UserRole } from '../common/enums/user-role.enum';
import { Event } from '../events/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;


  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Event, event => event.createdBy)
  events: Event[];
}
