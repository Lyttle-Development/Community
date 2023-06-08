import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Index('user__user-profile_pkey', ['userId'], { unique: true })
@Entity('user__user-profile', { schema: 'public' })
@ObjectType()
export class UserProfile {
  @Column('bigint', { primary: true, name: 'user_id' })
  @Field(() => Int)
  userId: string;

  @Column('double precision', {
    name: 'tokens',
    precision: 53,
    default: () => '0',
  })
  @Field(() => Float)
  tokens: number;

  @Column('double precision', {
    name: 'tokens_used',
    precision: 53,
    default: () => '0',
  })
  @Field(() => Float)
  tokensUsed: number;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.userProfile, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  @Field(() => User)
  user: User;
}
