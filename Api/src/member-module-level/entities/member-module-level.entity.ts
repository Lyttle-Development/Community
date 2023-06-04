import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MemberModuleLevelDay } from '../../member-module-level-day/entities/member-module-level-day.entity';
import { Guild } from '../../guild/entities/guild.entity';
import { Member } from '../../member/entities/member.entity';

@Entity('member__module__level')
@ObjectType()
export class MemberModuleLevel {
  // Primary key information
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Float)
  guild_id: number;

  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Float)
  user_id: number;

  // Relations
  @OneToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Guild)
  guild: Guild;

  @OneToOne(() => Member, (user: Member) => user.user_id)
  @Field(() => Member)
  member: Member;

  @OneToOne(
    () => MemberModuleLevelDay,
    (memberModuleLevelDay: MemberModuleLevelDay) =>
      memberModuleLevelDay.guild_id,
  )
  @Field(() => MemberModuleLevelDay)
  memberModuleLevelDay: MemberModuleLevelDay;

  // Checks
  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  spam_check: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  cooldown_count: number;

  @Column({ default: new Date() })
  @Field(() => Date, { defaultValue: new Date() })
  cooldown_time: Date;

  @Column({ default: new Date() })
  @Field(() => Date, { defaultValue: new Date() })
  call_start: Date;

  // Actual level data:
  @Column({ default: 0, type: 'double precision' })
  @Field(() => Float, { defaultValue: 0 })
  points: number;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
