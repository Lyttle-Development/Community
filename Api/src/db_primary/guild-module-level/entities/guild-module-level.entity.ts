import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Index('guild__module__level_pkey', ['guildId'], { unique: true })
@Entity('guild__module__level', { schema: 'public' })
@ObjectType()
export class GuildModuleLevel {
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
  announcementChannelId: string | null;

  @Column('bigint', { name: 'leaderboard_channel_id', nullable: true })
  @Field(() => String, { nullable: true })
  leaderboardChannelId: string | null;

  @Column('integer', { name: 'leaderboard_last_week', nullable: true })
  @Field(() => Int, { nullable: true })
  leaderboardLastWeek: number | null;

  @Column('boolean', { name: 'nicknames', default: () => 'false' })
  @Field(() => Boolean)
  nicknames: boolean;

  @Column('timestamp without time zone', {
    name: 'last_leaderboard',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  lastLeaderboard: Date;

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
