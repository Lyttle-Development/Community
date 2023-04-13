import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from '../../member/entities/member.entity';
import { MemberModuleLevelDay } from '../../member-module-level-day/entities/member-module-level-day.entity';

@Entity('member__module__level')
@ObjectType()
export class MemberModuleLevel {
  @PrimaryColumn()
  @OneToOne(() => Member, (member: Member) => member.guild_id)
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn()
  @OneToOne(() => Member, (member: Member) => member.user_id)
  @Field(() => Int)
  user_id: number;

  @Column()
  @Field(() => Int)
  spam_check: number;

  @Column()
  @Field(() => Int)
  cooldown_count: number;

  @Column()
  @Field(() => Date)
  cooldown_time: Date;

  @Column()
  @Field(() => Date)
  call_start: Date;

  @Column()
  @Field(() => Float)
  points: number;

  @OneToOne(
    () => MemberModuleLevelDay,
    (memberModuleLevelDay: MemberModuleLevelDay) =>
      memberModuleLevelDay.guild_id,
  )
  @Field(() => MemberModuleLevelDay)
  memberModuleLevelDay: MemberModuleLevelDay;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
