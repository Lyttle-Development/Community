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
import { Guild } from '../../guild/entities/guild.entity';

@Entity('member__module__level_day')
@ObjectType()
export class MemberModuleLevelDay {
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Float)
  guild_id: number;

  @PrimaryColumn()
  @Field(() => Int)
  user_id: number;

  // Relations
  @OneToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Guild)
  guild: Guild;

  @OneToOne(() => Member, (member: Member) => member.user_id)
  @Field(() => Member)
  member: Member;

  // Values
  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_mon: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_tue: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_wed: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_thu: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_fri: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_sat: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_sun: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points: number;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
