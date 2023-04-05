import { Field, Int, ObjectType } from '@nestjs/graphql';
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
  @PrimaryColumn()
  @ManyToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn()
  @Field(() => String)
  key: string;

  @Column()
  @Field(() => String)
  value: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
