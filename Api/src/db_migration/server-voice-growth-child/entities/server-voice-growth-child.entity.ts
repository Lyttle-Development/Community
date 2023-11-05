import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ServerVoiceGrowth } from '../../server-voice-growth/entities/server-voice-growth.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('ServerVoiceGrowthChild_pkey', ['channelId', 'guildId'], {
  unique: true,
})
@Entity('ServerVoiceGrowthChild', { schema: 'public' })
@ObjectType()
export class ServerVoiceGrowthChild {
  @Column('bigint', { primary: true, name: 'channelId' })
  @Field(() => String)
  channelId: string;

  @Column('bigint', { primary: true, name: 'guildId' })
  @Field(() => String)
  guildId: string;

  @Column('text', { name: 'name', default: () => 'unknown' })
  @Field(() => String)
  name: string;

  @Column('timestamp without time zone', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(
    () => ServerVoiceGrowth,
    (serverVoiceGrowth) => serverVoiceGrowth.serverVoiceGrowthChildren,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'masterId', referencedColumnName: 'channelId' },
    { name: 'guildId', referencedColumnName: 'guildId' },
  ])
  @Field(() => ServerVoiceGrowth)
  serverVoiceGrowth: ServerVoiceGrowth;
}
