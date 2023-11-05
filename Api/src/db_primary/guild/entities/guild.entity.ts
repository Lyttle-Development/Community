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
import { GuildStat } from '../../guild-stat/entities/guild-stat.entity';

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
  guildActions: GuildAction[];

  @OneToMany(() => GuildMessage, (guildMessage) => guildMessage.guild, {
    nullable: true,
  })
  guildMessages: GuildMessage[];

  @OneToOne(
    () => GuildModuleBirthday,
    (guildModuleBirthday) => guildModuleBirthday.guild,
    { nullable: true },
  )
  guildModuleBirthday: GuildModuleBirthday;

  @OneToMany(
    () => GuildModuleCountToNumber,
    (guildModuleCountToNumber) => guildModuleCountToNumber.guild,
    { nullable: true },
  )
  guildModuleCountToNumbers: GuildModuleCountToNumber[];

  @OneToOne(
    () => GuildModuleEasterEgg,
    (guildModuleEasterEgg) => guildModuleEasterEgg.guild,
    { nullable: true },
  )
  guildModuleEasterEgg: GuildModuleEasterEgg;

  @OneToOne(
    () => GuildModuleLevel,
    (guildModuleLevel) => guildModuleLevel.guild,
    { nullable: true },
  )
  guildModuleLevel: GuildModuleLevel;

  @OneToMany(
    () => GuildModuleVoiceGrowth,
    (guildModuleVoiceGrowth) => guildModuleVoiceGrowth.guild,
    { nullable: true },
  )
  guildModuleVoiceGrowths: GuildModuleVoiceGrowth[];

  @OneToMany(
    () => GuildTranslation,
    (guildTranslation) => guildTranslation.guild,
    { nullable: true },
  )
  guildTranslations: GuildTranslation[];

  @OneToMany(() => GuildStat, (guildTranslation) => guildTranslation.guild, {
    nullable: true,
  })
  guildStats: GuildStat[];

  @OneToMany(() => Member, (member) => member.guild, { nullable: true })
  members: Member[];
}
