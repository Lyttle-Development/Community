import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GuildModuleLevel } from '../../guild-module-level/entities/guild-module-level.entity';
import { GuildModuleQotd } from '../../guild-module-qotd/entities/guild-module-qotd.entity';

let guildModuleLevel;

@Entity()
@ObjectType()
export class Guild {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  guild_id: number;

  @OneToOne(() => GuildModuleLevel, { onDelete: 'CASCADE' })
  @Field(() => guildModuleLevel)
  guildModuleLevel: GuildModuleLevel;

  @OneToOne(() => GuildModuleQotd, { onDelete: 'CASCADE' })
  @Field(() => GuildModuleQotd)
  guildModuleQotd: GuildModuleQotd;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
