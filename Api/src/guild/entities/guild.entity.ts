import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GuildModuleLevel } from '../../guild-module-level/entities/guild-module-level.entity';
import { GuildModuleQotd } from '../../guild-module-qotd/entities/guild-module-qotd.entity';
import { GuildMessage } from '../../guild-message/entities/guild-message.entity';
import { GuildTranslation } from '../../guild-translation/entities/guild-translation.entity';
import { Member } from '../../member/entities/member.entity';
import { GuildModuleVoiceGrowth } from '../../guild-module-voice-growth/entities/guild-module-voice-growth.entity';

@Entity()
@ObjectType()
export class Guild {
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Float)
  guild_id: number;

  // Relations
  // - Members
  @OneToMany(() => Member, (member: Member) => member.guild_id, {
    nullable: true,
  })
  @Field(() => [Member])
  members: Member[];

  // - Cache
  @OneToMany(
    () => GuildTranslation,
    (guildTranslation: GuildTranslation) => guildTranslation.guild_id,
    { nullable: true },
  )
  @Field(() => [GuildTranslation])
  guildTranslations: GuildTranslation[];

  // - Modules
  @OneToOne(() => GuildModuleLevel, { onDelete: 'CASCADE', nullable: true })
  @Field(() => GuildModuleLevel)
  guildModuleLevel: GuildModuleLevel;

  @OneToOne(() => GuildModuleQotd, { onDelete: 'CASCADE', nullable: true })
  @Field(() => GuildModuleQotd)
  guildModuleQotd: GuildModuleQotd;

  @OneToOne(() => GuildModuleVoiceGrowth, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Field(() => GuildModuleVoiceGrowth)
  guildModuleVoiceGrowth: GuildModuleVoiceGrowth;

  @OneToMany(
    () => GuildMessage,
    (guildMessage: GuildMessage) => guildMessage.guild_id,
    { nullable: true },
  )
  @Field(() => [GuildMessage])
  guildMessages: GuildMessage[];

  // Values
  @Column()
  @Field(() => Boolean)
  enabled: boolean;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
