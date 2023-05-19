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
// Primary key information
export class GuildMessage {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'bigint' })
  @Field(() => Int)
  guild_id: number;

  // Relations
  @ManyToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Guild)
  guild: Guild;

  // Values
  @Column({ type: 'bigint' })
  @Field(() => Int)
  channel_id: number;

  @Column({ type: 'bigint' })
  @Field(() => Int)
  message_id: number;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
