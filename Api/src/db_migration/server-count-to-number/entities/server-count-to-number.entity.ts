import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Server } from '../../server/entities/server.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('ServerCountToNumber_pkey', ['guildId'], { unique: true })
@Entity('ServerCountToNumber', { schema: 'public' })
@ObjectType()
export class ServerCountToNumber {
  @Column('bigint', { primary: true, name: 'guildId' })
  @Field(() => String)
  guildId: string;

  @Column('timestamp without time zone', {
    name: 'nextDate',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  nextDate: Date;

  @Column('bigint', { name: 'channelId', default: () => '0' })
  @Field(() => String)
  channelId: string;

  @Column('bigint', { name: 'threadId', default: () => '0' })
  @Field(() => String)
  threadId: string;

  @Column('integer', { name: 'lastNumber', default: () => '0' })
  @Field(() => Number)
  lastNumber: number;

  @Column('bigint', { name: 'lastUserId', default: () => '0' })
  @Field(() => String)
  lastUserId: string;

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

  @OneToOne(() => Server, (server) => server.serverCountToNumber, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guildId', referencedColumnName: 'guildId' }])
  @Field(() => Server)
  guild: Server;
}
