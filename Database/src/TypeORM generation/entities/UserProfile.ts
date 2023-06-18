import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Index('user__profile_pkey', ['userId'], { unique: true })
@Entity('user__profile', { schema: 'public' })
export class UserProfile {
  @Column('bigint', { primary: true, name: 'user_id' })
  userId: string;

  @Column('double precision', {
    name: 'tokens',
    precision: 53,
    default: () => '0',
  })
  tokens: number;

  @Column('double precision', {
    name: 'tokens_used',
    precision: 53,
    default: () => '0',
  })
  tokensUsed: number;

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

  @OneToOne(() => User, (user) => user.userProfile, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;
}
