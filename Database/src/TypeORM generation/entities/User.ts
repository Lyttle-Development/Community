import { Column, Entity, Index, OneToOne } from 'typeorm';
import { UserProfile } from './UserProfile';

@Index('user_pkey', ['userId'], { unique: true })
@Entity('user', { schema: 'public' })
export class User {
  @Column('bigint', { primary: true, name: 'user_id' })
  userId: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile: UserProfile;
}
