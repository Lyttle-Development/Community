import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Server } from '../../server/entities/server.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('ServerEvent_pkey', ['guildId'], { unique: true })
@Entity('ServerEvent', { schema: 'public' })
@ObjectType()
export class ServerEvent {
  @Column('bigint', { primary: true, name: 'guildId' })
  @Field(() => String)
  guildId: string;

  @Column('bigint', { name: 'birthdayChannel', nullable: true })
  @Field(() => String)
  birthdayChannel: string | null;

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

  @OneToOne(() => Server, (server) => server.serverEvent, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guildId', referencedColumnName: 'guildId' }])
  @Field(() => Server)
  guild: Server;
}
