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

@Entity('guild__module__voice_growth')
@ObjectType()
export class GuildModuleVoiceGrowth {
  @Column()
  @PrimaryColumn()
  @OneToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Int)
  guild_id: number;

  @Column()
  @Field(() => Boolean)
  enabled: boolean;

  @Column()
  @Field(() => Int)
  announce_channel_id: number;

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
