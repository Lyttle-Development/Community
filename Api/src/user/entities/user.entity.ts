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
  @PrimaryColumn()
  @Field(() => Int)
  guild_id: number;

  @OneToMany(() => Member, (member: Member) => member.guild_id, {
    nullable: true,
  })
  @Field(() => [Member])
  members: Member[];

  @OneToOne(() => Profile, { onDelete: 'CASCADE' })
  @Field(() => Profile)
  profile: Profile;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
