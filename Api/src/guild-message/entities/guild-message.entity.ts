import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Entity('guild__message')
@ObjectType()
export class GuildMessage {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @ManyToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Int)
  guild_id: number;

  @Column()
  @Field(() => Int)
  channel_id: number;

  @Column()
  @Field(() => Int)
  message_id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
