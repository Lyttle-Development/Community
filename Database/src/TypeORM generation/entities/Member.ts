import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Guild } from './Guild';
import { MemberModuleLevel } from './MemberModuleLevel';

@Index('member_user_id_guild_id_key', ['guildId', 'userId'], { unique: true })
@Index('member_pkey', ['guildId', 'userId'], { unique: true })
@Entity('member', { schema: 'public' })
export class Member {
  @Column('bigint', { primary: true, name: 'user_id' })
  userId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('integer', { name: 'birthday', nullable: true })
  birthday: number | null;

  @Column('text', { name: 'nickname', nullable: true })
  nickname: string | null;

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

  @ManyToOne(() => Guild, (guild) => guild.members, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;

  @OneToOne(
    () => MemberModuleLevel,
    (memberModuleLevel) => memberModuleLevel.member,
  )
  memberModuleLevel: MemberModuleLevel;
}
