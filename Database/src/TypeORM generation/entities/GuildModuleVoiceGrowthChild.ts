import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { GuildModuleVoiceGrowth } from './GuildModuleVoiceGrowth';

@Index('guild__module__voice_growth__child_pkey', ['channelId', 'guildId'], {
  unique: true,
})
@Entity('guild__module__voice_growth__child', { schema: 'public' })
export class GuildModuleVoiceGrowthChild {
  @Column('bigint', { primary: true, name: 'channel_id' })
  channelId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('text', { name: 'name', default: () => "'unknown'" })
  name: string;

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

  @ManyToOne(
    () => GuildModuleVoiceGrowth,
    (guildModuleVoiceGrowth) =>
      guildModuleVoiceGrowth.guildModuleVoiceGrowthChildren,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'master_id', referencedColumnName: 'channelId' },
    { name: 'guild_id', referencedColumnName: 'guildId' },
  ])
  guildModuleVoiceGrowth: GuildModuleVoiceGrowth;
}
