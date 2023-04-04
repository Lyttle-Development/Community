import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('guild__module__level')
@ObjectType()
export class GuildModuleLevel {
  @PrimaryColumn()
  @Field(() => Int)
  guild_id: number;

  @Column()
  @Field(() => Boolean)
  enabled: boolean;

  @Column()
  @Field(() => Int)
  announcement_channel_id: number;

  @Column()
  @Field(() => Int)
  leaderboard_channel_id: number;

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
