import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Guild } from './Guild';

@Index('guild__module__count_to_number_pkey', ['channelId', 'guildId'], {
  unique: true,
})
@Entity('guild__module__count_to_number', { schema: 'public' })
export class GuildModuleCountToNumber {
  @Column('bigint', { primary: true, name: 'channel_id' })
  channelId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'false' })
  enabled: boolean;

  @Column('timestamp without time zone', {
    name: 'next_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  nextDate: Date;

  @Column('bigint', { name: 'thread_id', default: () => '0' })
  threadId: string;

  @Column('integer', { name: 'last_number', default: () => '0' })
  lastNumber: number;

  @Column('bigint', { name: 'last_member_id', default: () => '0' })
  lastMemberId: string;

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

  @ManyToOne(() => Guild, (guild) => guild.guildModuleCountToNumbers, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;
}
