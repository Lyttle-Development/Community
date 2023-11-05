import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { ServerCountToNumber } from '../../server-count-to-number/entities/server-count-to-number.entity';
import { ServerEasterEgg } from '../../server-easter-egg/entities/server-easter-egg.entity';
import { ServerEvent } from '../../server-event/entities/server-event.entity';
import { ServerLevel } from '../../server-level/entities/server-level.entity';
import { ServerUser } from '../../server-user/entities/server-user.entity';
import { ServerVoiceGrowth } from '../../server-voice-growth/entities/server-voice-growth.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('Server_pkey', ['guildId'], { unique: true })
@Entity('Server', { schema: 'public' })
@ObjectType()
export class Server {
  @Column('bigint', { primary: true, name: 'guildId' })
  @Field(() => String)
  guildId: string;

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
    () => ServerCountToNumber,
    (serverCountToNumber) => serverCountToNumber.guild,
  )
  @Field(() => ServerCountToNumber)
  serverCountToNumber: ServerCountToNumber;

  @OneToOne(() => ServerEasterEgg, (serverEasterEgg) => serverEasterEgg.guild)
  @Field(() => ServerEasterEgg)
  serverEasterEgg: ServerEasterEgg;

  @OneToOne(() => ServerEvent, (serverEvent) => serverEvent.guild)
  @Field(() => ServerEvent)
  serverEvent: ServerEvent;

  @OneToOne(() => ServerLevel, (serverLevel) => serverLevel.guild)
  @Field(() => ServerLevel)
  serverLevel: ServerLevel;

  @OneToMany(() => ServerUser, (serverUser) => serverUser.guild)
  @Field(() => [ServerUser])
  serverUsers: ServerUser[];

  @OneToMany(
    () => ServerVoiceGrowth,
    (serverVoiceGrowth) => serverVoiceGrowth.guild,
  )
  @Field(() => [ServerVoiceGrowth])
  serverVoiceGrowths: ServerVoiceGrowth[];
}
