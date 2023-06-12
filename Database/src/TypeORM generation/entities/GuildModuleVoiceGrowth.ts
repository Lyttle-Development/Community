import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Guild } from './Guild';
import { GuildModuleVoiceGrowthChild } from './GuildModuleVoiceGrowthChild';

@Index('guild__module__voice_growth_pkey', ['channelId', 'guildId'], {
  unique: true,
})
@Entity('guild__module__voice_growth', { schema: 'public' })
export class GuildModuleVoiceGrowth {
  @Column('bigint', { primary: true, name: 'channel_id' })
  channelId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'false' })
  enabled: boolean;

  @Column('text', { name: 'preset', nullable: true })
  preset: string | null;

  @Column('text', { name: 'prefix', nullable: true })
  prefix: string | null;

  @Column('boolean', { name: 'manual', default: () => 'false' })
  manual: boolean;

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

  @ManyToOne(() => Guild, (guild) => guild.guildModuleVoiceGrowths, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;

  @OneToMany(
    () => GuildModuleVoiceGrowthChild,
    (guildModuleVoiceGrowthChild) =>
      guildModuleVoiceGrowthChild.guildModuleVoiceGrowth,
  )
  guildModuleVoiceGrowthChildren: GuildModuleVoiceGrowthChild[];
}
