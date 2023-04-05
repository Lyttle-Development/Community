import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Entity('guild__module__qotd')
@ObjectType()
export class GuildModuleQotd {
  @PrimaryColumn()
  @OneToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Int)
  guild_id: number;

  @Column()
  @Field(() => Boolean)
  enabled: boolean;

  @Column()
  @Field(() => Int)
  channel_id: number;

  @Column()
  @Field(() => Int)
  message_id: number;

  @Column()
  @Field(() => Boolean)
  nicknames: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
