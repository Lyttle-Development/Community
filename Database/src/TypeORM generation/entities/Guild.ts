import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { GuildAction } from './GuildAction';
import { GuildMessage } from './GuildMessage';
import { GuildModuleBirthday } from './GuildModuleBirthday';
import { GuildModuleCountToNumber } from './GuildModuleCountToNumber';
import { GuildModuleEasterEgg } from './GuildModuleEasterEgg';
import { GuildModuleLevel } from './GuildModuleLevel';
import { GuildModuleVoiceGrowth } from './GuildModuleVoiceGrowth';
import { GuildTranslation } from './GuildTranslation';
import { Member } from './Member';

@Index('guild_pkey', ['guildId'], { unique: true })
@Entity('guild', { schema: 'public' })
export class Guild {
  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'true' })
  enabled: boolean;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => GuildAction, (guildAction) => guildAction.guild)
  guildActions: GuildAction[];

  @OneToMany(() => GuildMessage, (guildMessage) => guildMessage.guild)
  guildMessages: GuildMessage[];

  @OneToOne(
    () => GuildModuleBirthday,
    (guildModuleBirthday) => guildModuleBirthday.guild,
  )
  guildModuleBirthday: GuildModuleBirthday;

  @OneToMany(
    () => GuildModuleCountToNumber,
    (guildModuleCountToNumber) => guildModuleCountToNumber.guild,
  )
  guildModuleCountToNumbers: GuildModuleCountToNumber[];

  @OneToOne(
    () => GuildModuleEasterEgg,
    (guildModuleEasterEgg) => guildModuleEasterEgg.guild,
  )
  guildModuleEasterEgg: GuildModuleEasterEgg;

  @OneToOne(
    () => GuildModuleLevel,
    (guildModuleLevel) => guildModuleLevel.guild,
  )
  guildModuleLevel: GuildModuleLevel;

  @OneToMany(
    () => GuildModuleVoiceGrowth,
    (guildModuleVoiceGrowth) => guildModuleVoiceGrowth.guild,
  )
  guildModuleVoiceGrowths: GuildModuleVoiceGrowth[];

  @OneToMany(
    () => GuildTranslation,
    (guildTranslation) => guildTranslation.guild,
  )
  guildTranslations: GuildTranslation[];

  @OneToMany(() => Member, (member) => member.guild)
  members: Member[];
}
