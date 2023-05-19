import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from '../../member/entities/member.entity';
import { Profile } from '../../profile/entities/profile.entity';

@Entity()
@ObjectType()
export class User {
  // Primary key information
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Int)
  user_id: number;

  // Relations
  @OneToMany(() => Member, (member: Member) => member.guild_id, {
    nullable: true,
  })
  @Field(() => [Member])
  members: Member[];

  @OneToOne(() => Profile, { onDelete: 'CASCADE' })
  @Field(() => Profile)
  profile: Profile;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
