import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Guild } from './Guild';

@Index('guild__module__level_pkey', ['guildId'], { unique: true })
@Entity('guild__module__level', { schema: 'public' })
export class GuildModuleLevel {
  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'false' })
  enabled: boolean;

  @Column('integer', { name: 'leveling_multiplier', default: () => '8' })
  levelingMultiplier: number;

  @Column('bigint', { name: 'announcement_channel_id', nullable: true })
  announcementChannelId: string | null;

  @Column('bigint', { name: 'leaderboard_channel_id', nullable: true })
  leaderboardChannelId: string | null;

  @Column('integer', { name: 'leaderboard_last_week', nullable: true })
  leaderboardLastWeek: number | null;

  @Column('boolean', { name: 'nicknames', default: () => 'false' })
  nicknames: boolean;

  @Column('timestamp without time zone', {
    name: 'last_leaderboard',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastLeaderboard: Date;

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

  @OneToOne(() => Guild, (guild) => guild.guildModuleLevel, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;
}
