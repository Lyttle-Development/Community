import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ServerUser } from '../../server-user/entities/server-user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('ServerUserDailyActivity_pkey', ['guildId', 'userId'], { unique: true })
@Index('ServerUserDailyActivity_userId_guildId_key', ['guildId', 'userId'], {
  unique: true,
})
@Entity('ServerUserDailyActivity', { schema: 'public' })
@ObjectType()
export class ServerUserDailyActivity {
  @Column('bigint', { primary: true, name: 'userId' })
  @Field(() => String)
  userId: string;

  @Column('bigint', { primary: true, name: 'guildId' })
  @Field(() => String)
  guildId: string;

  @Column('integer', { name: 'pointsMon', default: () => '0' })
  @Field(() => Number)
  pointsMon: number;

  @Column('integer', { name: 'pointsTue', default: () => '0' })
  @Field(() => Number)
  pointsTue: number;

  @Column('integer', { name: 'pointsWed', default: () => '0' })
  @Field(() => Number)
  pointsWed: number;

  @Column('integer', { name: 'pointsThu', default: () => '0' })
  @Field(() => Number)
  pointsThu: number;

  @Column('integer', { name: 'pointsFri', default: () => '0' })
  @Field(() => Number)
  pointsFri: number;

  @Column('integer', { name: 'pointsSat', default: () => '0' })
  @Field(() => Number)
  pointsSat: number;

  @Column('integer', { name: 'pointsSun', default: () => '0' })
  @Field(() => Number)
  pointsSun: number;

  @Column('integer', { name: 'points', default: () => '0' })
  @Field(() => Number)
  points: number;

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

  @OneToOne(
    () => ServerUser,
    (serverUser) => serverUser.serverUserDailyActivity,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'userId', referencedColumnName: 'userId' },
    { name: 'guildId', referencedColumnName: 'guildId' },
  ])
  @Field(() => ServerUser)
  serverUser: ServerUser;
}
