import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Server } from '../../server/entities/server.entity';
import { ServerVoiceGrowthChild } from '../../server-voice-growth-child/entities/server-voice-growth-child.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('ServerVoiceGrowth_pkey', ['channelId', 'guildId'], { unique: true })
@Entity('ServerVoiceGrowth', { schema: 'public' })
@ObjectType()
export class ServerVoiceGrowth {
  @Column('bigint', { primary: true, name: 'channelId' })
  @Field(() => String)
  channelId: string;

  @Column('bigint', { primary: true, name: 'guildId' })
  @Field(() => String)
  guildId: string;

  @Column('text', { name: 'preset', nullable: true })
  @Field(() => String)
  preset: string | null;

  @Column('text', { name: 'prefix', nullable: true })
  @Field(() => String)
  prefix: string | null;

  @Column('boolean', { name: 'manual', default: () => 'false' })
  @Field(() => Boolean)
  manual: boolean;

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

  @ManyToOne(() => Server, (server) => server.serverVoiceGrowths, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guildId', referencedColumnName: 'guildId' }])
  @Field(() => Server)
  guild: Server;

  @OneToMany(
    () => ServerVoiceGrowthChild,
    (serverVoiceGrowthChild) => serverVoiceGrowthChild.serverVoiceGrowth,
  )
  @Field(() => [ServerVoiceGrowthChild])
  serverVoiceGrowthChildren: ServerVoiceGrowthChild[];
}
