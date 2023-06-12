import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { GuildModuleLevel } from '../../guild-module-level/entities/guild-module-level.entity';
import { GuildMessage } from '../../guild-message/entities/guild-message.entity';
import { GuildTranslation } from '../../guild-translation/entities/guild-translation.entity';
import { Member } from '../../member/entities/member.entity';
import { GuildModuleVoiceGrowth } from '../../guild-module-voice-growth/entities/guild-module-voice-growth.entity';
import { GuildModuleBirthday } from '../../guild-module-birthday/entities/guild-module-birthday.entity';
import { GuildModuleCountToNumber } from '../../guild-module-count-to-number/entities/guild-module-count-to-number.entity';
import { GuildModuleEasterEgg } from '../../guild-module-easter-egg/entities/guild-module-easter-egg.entity';
import { GuildAction } from '../../guild-action/entities/guild-action.entity';

@Index('guild_pkey', ['guildId'], { unique: true })
@Entity('guild', { schema: 'public' })
@ObjectType()
export class Guild {
  @Column('bigint', { primary: true, name: 'guild_id' })
  @Field(() => String)
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'true' })
  @Field(() => Boolean)
  enabled: boolean;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => GuildAction, (guildAction) => guildAction.guild, {
    nullable: true,
  })
  @Field(() => [GuildAction], { nullable: true })
  guildActions: GuildAction[];

  @OneToMany(() => GuildMessage, (guildMessage) => guildMessage.guild, {
    nullable: true,
  })
  @Field(() => [GuildMessage], { nullable: true })
  guildMessages: GuildMessage[];

  @OneToOne(
    () => GuildModuleBirthday,
    (guildModuleBirthday) => guildModuleBirthday.guild,
    { nullable: true },
  )
  @Field(() => GuildModuleBirthday, { nullable: true })
  guildModuleBirthday: GuildModuleBirthday;

  @OneToMany(
    () => GuildModuleCountToNumber,
    (guildModuleCountToNumber) => guildModuleCountToNumber.guild,
    { nullable: true },
  )
  @Field(() => [GuildModuleCountToNumber], { nullable: true })
  guildModuleCountToNumbers: GuildModuleCountToNumber[];

  @OneToOne(
    () => GuildModuleEasterEgg,
    (guildModuleEasterEgg) => guildModuleEasterEgg.guild,
    { nullable: true },
  )
  @Field(() => GuildModuleEasterEgg, { nullable: true })
  guildModuleEasterEgg: GuildModuleEasterEgg;

  @OneToOne(
    () => GuildModuleLevel,
    (guildModuleLevel) => guildModuleLevel.guild,
    { nullable: true },
  )
  @Field(() => GuildModuleLevel, { nullable: true })
  guildModuleLevel: GuildModuleLevel;

  @OneToMany(
    () => GuildModuleVoiceGrowth,
    (guildModuleVoiceGrowth) => guildModuleVoiceGrowth.guild,
    { nullable: true },
  )
  @Field(() => [GuildModuleVoiceGrowth], { nullable: true })
  guildModuleVoiceGrowths: GuildModuleVoiceGrowth[];

  @OneToMany(
    () => GuildTranslation,
    (guildTranslation) => guildTranslation.guild,
    { nullable: true },
  )
  @Field(() => [GuildTranslation], { nullable: true })
  guildTranslations: GuildTranslation[];

  @OneToMany(() => Member, (member) => member.guild, { nullable: true })
  @Field(() => [Member], { nullable: true })
  members: Member[];
}
