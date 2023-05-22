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
  // Primary key information
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Int)
  channel_id: number;

  // Relations
  @OneToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Guild)
  guild: Guild;

  // Values
  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  enabled: boolean;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  preset: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  prefix: string;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  manual: boolean;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
