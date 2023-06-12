import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { MemberModuleLevelDay } from '../../member-module-level-day/entities/member-module-level-day.entity';
import { Member } from '../../member/entities/member.entity';

@Index('member__module__level_pkey', ['guildId', 'userId'], { unique: true })
@Index('member__module__level_user_id_guild_id_key', ['guildId', 'userId'], {
  unique: true,
})
@Entity('member__module__level', { schema: 'public' })
@ObjectType()
export class MemberModuleLevel {
  @Column('bigint', { primary: true, name: 'user_id' })
  @Field(() => String)
  userId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  @Field(() => String)
  guildId: string;

  @Column('integer', { name: 'spam_check', default: () => '0' })
  @Field(() => Int)
  spamCheck: number;

  @Column('integer', { name: 'cooldown_count', default: () => '0' })
  @Field(() => Int)
  cooldownCount: number;

  @Column('timestamp without time zone', {
    name: 'cooldown_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  cooldownTime: Date;

  @Column('timestamp without time zone', {
    name: 'call_start',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  callStart: Date;

  @Column('double precision', {
    name: 'points',
    precision: 53,
    default: () => '0',
  })
  @Field(() => Float)
  points: number;

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

  @OneToOne(() => Member, (member) => member.memberModuleLevel, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'user_id', referencedColumnName: 'userId' },
    { name: 'guild_id', referencedColumnName: 'guildId' },
  ])
  member: Member;

  @OneToOne(
    () => MemberModuleLevelDay,
    (memberModuleLevelDay) => memberModuleLevelDay.memberModuleLevel,
    { nullable: true },
  )
  memberModuleLevelDay: MemberModuleLevelDay;
}
