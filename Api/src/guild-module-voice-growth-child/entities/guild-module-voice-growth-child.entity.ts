import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { GuildModuleVoiceGrowth } from '../../guild-module-voice-growth/entities/guild-module-voice-growth.entity';

@Index('guild__module__voice_growth__child_pkey', ['channelId', 'guildId'], {
  unique: true,
})
@Entity('guild__module__voice_growth__child', { schema: 'public' })
@ObjectType()
export class GuildModuleVoiceGrowthChild {
  @Column('bigint', { primary: true, name: 'channel_id' })
  @Field(() => String)
  channelId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  @Field(() => String)
  guildId: string;

  @Column('text', { name: 'name', default: () => "'unknown'" })
  @Field(() => String)
  name: string;

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
