import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Member } from './Member';
import { MemberModuleLevelDay } from './MemberModuleLevelDay';

@Index('member__module__level_pkey', ['guildId', 'userId'], { unique: true })
@Index('member__module__level_user_id_guild_id_key', ['guildId', 'userId'], {
  unique: true,
})
@Entity('member__module__level', { schema: 'public' })
export class MemberModuleLevel {
  @Column('bigint', { primary: true, name: 'user_id' })
  userId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('integer', { name: 'spam_check', default: () => '0' })
  spamCheck: number;

  @Column('integer', { name: 'cooldown_count', default: () => '0' })
  cooldownCount: number;

  @Column('timestamp without time zone', {
    name: 'cooldown_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  cooldownTime: Date;

  @Column('timestamp without time zone', {
    name: 'call_start',
    default: () => 'CURRENT_TIMESTAMP',
  })
  callStart: Date;

  @Column('double precision', {
    name: 'points',
    precision: 53,
    default: () => '0',
  })
  points: number;

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
  )
  memberModuleLevelDay: MemberModuleLevelDay;
}
