import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';
import { GuildModuleVoiceGrowthChild } from '../../guild-module-voice-growth-child/entities/guild-module-voice-growth-child.entity';

@Index('guild__module__voice_growth_pkey', ['channelId', 'guildId'], {
  unique: true,
})
@Entity('guild__module__voice_growth', { schema: 'public' })
@ObjectType()
export class GuildModuleVoiceGrowth {
  @Column('bigint', { primary: true, name: 'channel_id' })
  @Field(() => String)
  channelId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  @Field(() => String)
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'false' })
  @Field(() => Boolean)
  enabled: boolean;

  @Column('text', { name: 'preset', nullable: true })
  @Field(() => String, { nullable: true })
  preset: string | null;

  @Column('text', { name: 'prefix', nullable: true })
  @Field(() => String, { nullable: true })
  prefix: string | null;

  @Column('boolean', { name: 'manual', default: () => 'false' })
  @Field(() => Boolean)
  manual: boolean;

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

  @ManyToOne(() => Guild, (guild) => guild.guildModuleVoiceGrowths, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  @Field(() => Guild)
  guild: Guild;

  @OneToMany(
    () => GuildModuleVoiceGrowthChild,
    (guildModuleVoiceGrowthChild) =>
      guildModuleVoiceGrowthChild.guildModuleVoiceGrowth,
    { nullable: true },
  )
  @Field(() => [GuildModuleVoiceGrowthChild], { nullable: true })
  guildModuleVoiceGrowthChildren: GuildModuleVoiceGrowthChild[];
}
