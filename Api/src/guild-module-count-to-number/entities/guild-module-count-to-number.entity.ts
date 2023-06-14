import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Index('guild__module__count_to_number_pkey', ['channelId', 'guildId'], {
  unique: true,
})
@Entity('guild__module__count_to_number', { schema: 'public' })
@ObjectType()
export class GuildModuleCountToNumber {
  @Column('bigint', { primary: true, name: 'channel_id' })
  @Field(() => Int)
  channelId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  @Field(() => Int)
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'false' })
  @Field(() => Boolean)
  enabled: boolean;

  @Column('timestamp without time zone', {
    name: 'next_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  nextDate: Date;

  @Column('bigint', { name: 'thread_id', default: () => '0' })
  @Field(() => Int)
  threadId: string;

  @Column('integer', { name: 'last_number', default: () => '0' })
  @Field(() => Int)
  lastNumber: number;

  @Column('bigint', { name: 'last_member_id', default: () => '0' })
  @Field(() => Int)
  lastMemberId: string;

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

  @ManyToOne(() => Guild, (guild) => guild.guildModuleCountToNumbers, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;
}
