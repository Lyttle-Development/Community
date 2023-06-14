import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { UserProfile } from '../../user-profile/entities/user-profile.entity';

@Index('user_pkey', ['userId'], { unique: true })
@Entity('user', { schema: 'public' })
@ObjectType()
export class User {
  @Column('bigint', { primary: true, name: 'user_id' })
  @Field(() => String)
  userId: string;

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

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user, {
    nullable: true,
  })
  userProfile: UserProfile;
}
