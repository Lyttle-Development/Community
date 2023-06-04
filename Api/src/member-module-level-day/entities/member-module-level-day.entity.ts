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

@Entity('member__module__level__day')
@ObjectType()
export class MemberModuleLevelDay {
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

  @OneToOne(() => Member, (member: Member) => member.user_id)
  @Field(() => Member)
  member: Member;

  // Values
  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_monday: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_tuesday: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_wednesday: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_thursday: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_friday: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_saturday: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  points_sunday: number;

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
