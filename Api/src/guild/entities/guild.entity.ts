import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GuildModuleLevel } from '../../guild-module-level/entities/guild-module-level.entity';
import { GuildModuleQotd } from '../../guild-module-qotd/entities/guild-module-qotd.entity';
import { GuildMessage } from '../../guild-message/entities/guild-message.entity';
import { GuildTranslation } from '../../guild-translation/entities/guild-translation.entity';

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

  @OneToMany(
    () => GuildMessage,
    (guildMessage: GuildMessage) => guildMessage.guild_id,
  )
  @Field(() => [GuildMessage])
  guildMessages: GuildMessage[];

  @OneToMany(
    () => GuildTranslation,
    (guildTranslation: GuildTranslation) => guildTranslation.guild_id,
  )
  @Field(() => [GuildTranslation])
  guildTranslations: GuildTranslation[];

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
