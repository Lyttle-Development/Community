import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Server } from '../../server/entities/server.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('ServerLevel_pkey', ['guildId'], { unique: true })
@Entity('ServerLevel', { schema: 'public' })
@ObjectType()
export class ServerLevel {
  @Column('bigint', { primary: true, name: 'guildId' })
  @Field(() => String)
  guildId: string;

  @Column('bigint', { name: 'announcementChannel', nullable: true })
  @Field(() => String)
  announcementChannel: string | null;

  @Column('bigint', { name: 'leaderboardChannel', nullable: true })
  @Field(() => String)
  leaderboardChannel: string | null;

  @Column('integer', { name: 'leaderboardLastWeek', nullable: true })
  @Field(() => Number)
  leaderboardLastWeek: number | null;

  @Column('boolean', { name: 'nicknames', default: () => 'false' })
  @Field(() => Boolean)
  nicknames: boolean;

  @Column('timestamp without time zone', {
    name: 'lastLeaderboard',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  lastLeaderboard: Date;

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

  @OneToOne(() => Server, (server) => server.serverLevel, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guildId', referencedColumnName: 'guildId' }])
  @Field(() => Server)
  guild: Server;
}
