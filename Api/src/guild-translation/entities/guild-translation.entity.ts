import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Entity('guild__translation')
@ObjectType()
export class GuildTranslation {
  // Primary key information
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Float)
  guild_id: number;

  // relations
  @ManyToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Guild)
  guild: Guild;

  // Values
  @PrimaryColumn({ type: 'text' })
  @Field(() => String)
  key: string;

  @Column({ type: 'text' })
  @Field(() => String)
  value: string;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
