import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ServerUser } from '../../server-user/entities/server-user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('ServerUserLevel_pkey', ['guildId', 'userId'], { unique: true })
@Entity('ServerUserLevel', { schema: 'public' })
@ObjectType()
export class ServerUserLevel {
  @Column('bigint', { primary: true, name: 'userId' })
  @Field(() => String)
  userId: string;

  @Column('bigint', { primary: true, name: 'guildId' })
  @Field(() => String)
  guildId: string;

  @Column('integer', { name: 'spamCheck', default: () => '0' })
  @Field(() => Number)
  spamCheck: number;

  @Column('integer', { name: 'cooldownCount', default: () => '0' })
  @Field(() => Number)
  cooldownCount: number;

  @Column('timestamp without time zone', {
    name: 'cooldownTime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  cooldownTime: Date;

  @Column('boolean', { name: 'inCall', default: () => 'false' })
  @Field(() => Boolean)
  inCall: boolean;

  @Column('timestamp without time zone', {
    name: 'callStart',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  callStart: Date;

  @Column('boolean', { name: 'callAlone', default: () => 'false' })
  @Field(() => Boolean)
  callAlone: boolean;

  @Column('double precision', {
    name: 'points',
    precision: 53,
    default: () => '0',
  })
  @Field(() => Number)
  points: number;

  @Column('double precision', {
    name: 'pointsAvailable',
    precision: 53,
    default: () => '0',
  })
  @Field(() => Number)
  pointsAvailable: number;

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

  @OneToOne(() => ServerUser, (serverUser) => serverUser.serverUserLevel, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'userId', referencedColumnName: 'userId' },
    { name: 'guildId', referencedColumnName: 'guildId' },
  ])
  @Field(() => ServerUser)
  serverUser: ServerUser;
}
