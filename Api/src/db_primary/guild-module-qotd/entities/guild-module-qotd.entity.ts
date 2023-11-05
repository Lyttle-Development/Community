import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Index('guild__module__qotd_pkey', ['guildId'], { unique: true })
@Entity('guild__module__qotd', { schema: 'public' })
@ObjectType()
export class GuildModuleQotd {
  @Column('bigint', { primary: true, name: 'guild_id' })
  @Field(() => String)
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'false' })
  @Field(() => Boolean)
  enabled: boolean;

  @Column('integer', { name: 'leveling_multiplier', default: () => '8' })
  @Field(() => Int)
  levelingMultiplier: number;

  @Column('bigint', { name: 'announcement_channel_id', nullable: true })
  @Field(() => String, { nullable: true })
  messageId: string | null;

  @Column('bigint', { name: 'leaderboard_channel_id', nullable: true })
  @Field(() => String, { nullable: true })
  channelId: string | null;

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

  @OneToOne(() => Guild, (guild) => guild.guildModuleLevel, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;
}
