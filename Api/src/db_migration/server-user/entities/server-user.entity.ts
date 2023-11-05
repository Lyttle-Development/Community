import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Server } from '../../server/entities/server.entity';
import { ServerUserDailyActivity } from '../../server-user-daily-activity/entities/server-user-daily-activity.entity';
import { ServerUserLevel } from '../../server-user-level/entities/server-user-level.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('ServerUser_pkey', ['guildId', 'userId'], { unique: true })
@Entity('ServerUser', { schema: 'public' })
@ObjectType()
export class ServerUser {
  @Column('bigint', { primary: true, name: 'userId' })
  @Field(() => String)
  userId: string;

  @Column('bigint', { primary: true, name: 'guildId' })
  @Field(() => String)
  guildId: string;

  @Column('timestamp without time zone', {
    name: 'birthdayDate',
    nullable: true,
  })
  @Field(() => Date, { nullable: true })
  birthdayDate: Date | null;

  @Column('integer', { name: 'birthday', nullable: true })
  @Field(() => Number, { nullable: true })
  birthday: number | null;

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

  @ManyToOne(() => Server, (server) => server.serverUsers, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guildId', referencedColumnName: 'guildId' }])
  @Field(() => Server)
  guild: Server;

  @OneToOne(
    () => ServerUserDailyActivity,
    (serverUserDailyActivity) => serverUserDailyActivity.serverUser,
  )
  @JoinColumn([
    { name: 'userId', referencedColumnName: 'userId' },
    { name: 'guildId', referencedColumnName: 'guildId' },
  ])
  @Field(() => ServerUserDailyActivity)
  serverUserDailyActivity: ServerUserDailyActivity;

  @OneToOne(
    () => ServerUserLevel,
    (serverUserLevel) => serverUserLevel.serverUser,
  )
  @JoinColumn([
    { name: 'userId', referencedColumnName: 'userId' },
    { name: 'guildId', referencedColumnName: 'guildId' },
  ])
  @Field(() => ServerUserLevel)
  serverUserLevel: ServerUserLevel;
}
