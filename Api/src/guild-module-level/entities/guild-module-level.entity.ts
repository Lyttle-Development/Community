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

@Entity('guild__module__level')
@ObjectType()
export class GuildModuleLevel {
  // Primary key information
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Int)
  guild_id: number;

  // Relations
  @OneToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Guild)
  guild: Guild;

  // Values
  @Column()
  @Field(() => Boolean, { defaultValue: false })
  enabled: boolean;

  @Column()
  @Field(() => Int, { defaultValue: 8 })
  leveling_multiplier: number;

  @Column({ type: 'bigint', nullable: true })
  @Field(() => Int, {
    nullable: true,
  })
  announcement_channel_id?: number;

  @Column({ type: 'bigint', nullable: true })
  @Field(() => Int, { nullable: true })
  leaderboard_channel_id?: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  leaderboard_last_week: number;

  @Column()
  @Field(() => Boolean, { defaultValue: false })
  nicknames: boolean;

  @Column()
  @Field(() => Date, { defaultValue: new Date() })
  last_leaderboard: Date;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
