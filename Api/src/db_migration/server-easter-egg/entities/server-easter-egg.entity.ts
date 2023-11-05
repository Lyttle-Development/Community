import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Server } from '../../server/entities/server.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('ServerEasterEgg_pkey', ['guildId'], { unique: true })
@Entity('ServerEasterEgg', { schema: 'public' })
@ObjectType()
export class ServerEasterEgg {
  @Column('bigint', { primary: true, name: 'guildId' })
  @Field(() => String)
  guildId: string;

  @Column('timestamp without time zone', {
    name: 'lastJoker',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  lastJoker: Date;

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

  @OneToOne(() => Server, (server) => server.serverEasterEgg, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guildId', referencedColumnName: 'guildId' }])
  @Field(() => Server)
  guild: Server;
}
