import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateGuildInput } from './dto/create-guild.input';
import type { UpdateGuildInput } from './dto/update-guild.input';
import { Guild } from './entities/guild.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GuildModuleLevelService } from '../guild-module-level/guild-module-level.service';
import type { GuildModuleLevel } from '../guild-module-level/entities/guild-module-level.entity';
import type { GuildModuleQotd } from '../guild-module-qotd/entities/guild-module-qotd.entity';
import { GuildModuleQotdService } from '../guild-module-qotd/guild-module-qotd.service';
import type { GuildMessage } from '../guild-message/entities/guild-message.entity';
import { GuildMessageService } from '../guild-message/guild-message.service';
import { GuildTranslationService } from '../guild-translation/guild-translation.service';
import type { GuildTranslation } from '../guild-translation/entities/guild-translation.entity';
import { MemberService } from '../member/member.service';
import type { Member } from '../member/entities/member.entity';
import { GuildModuleVoiceGrowthService } from '../guild-module-voice-growth/guild-module-voice-growth.service';
import { GuildModuleVoiceGrowth } from '../guild-module-voice-growth/entities/guild-module-voice-growth.entity';
import { Discord } from '../discord/entities/discord.entity';
import { DiscordService } from '../discord/discord.service';
import { GuildStatResolvedService } from '../guild-stat-resolved/guild-stat-resolved.service';
import { GuildStatResolved } from '../guild-stat-resolved/entities/guild-stat-resolved.entity';
import { OpenAiService } from '../open-ai/open-ai.service';
import { OpenAi } from '../open-ai/entities/open-ai.entity';
import { GuildModuleBirthdayService } from '../guild-module-birthday/guild-module-birthday.service';
import { GuildModuleBirthday } from '../guild-module-birthday/entities/guild-module-birthday.entity';

@Injectable()
export class GuildService {
  constructor(
    @InjectRepository(Guild)
    private guildRepository: Repository<Guild>,
    @Inject(forwardRef(() => GuildModuleLevelService))
    private guildModuleLevelService: GuildModuleLevelService,
    @Inject(forwardRef(() => GuildModuleBirthdayService))
    private guildModuleBirthdayService: GuildModuleBirthdayService,
    @Inject(forwardRef(() => GuildModuleQotdService))
    private guildModuleQotdService: GuildModuleQotdService,
    @Inject(forwardRef(() => GuildMessageService))
    private guildMessageService: GuildMessageService,
    @Inject(forwardRef(() => GuildTranslationService))
    private guildTranslationService: GuildTranslationService,
    @Inject(forwardRef(() => MemberService))
    private memberService: MemberService,
    @Inject(forwardRef(() => GuildModuleVoiceGrowthService))
    private guildModuleVoiceGrowthService: GuildModuleVoiceGrowthService,
    @Inject(forwardRef(() => DiscordService))
    private discordService: DiscordService,
    @Inject(forwardRef(() => GuildStatResolvedService))
    private guildStatResolvedService: GuildStatResolvedService,
    @Inject(forwardRef(() => OpenAiService))
    private openaiService: OpenAiService,
  ) {}

  create(createGuildInput: CreateGuildInput): Promise<Guild> {
    return this.guildRepository.save(createGuildInput);
  }

  findAll(): Promise<Guild[]> {
    return this.guildRepository.find();
  }

  findAllByGuildIds(guildIds: string[]): Promise<Guild[]> {
    return this.guildRepository.find({
      where: { guildId: In(guildIds) },
    });
  }

  async findAllBuildsByStaffMemberId(
    guildIds: string[],
    userId: string,
  ): Promise<Guild[]> {
    // Find all guild where the user id is in the staff member ids: guild stat: staffMembersIds

    const guilds: Guild[] = [];

    for (const guildId of guildIds) {
      try {
        const guild: Guild = await this.guildRepository.findOne({
          where: { guildId, guildStats: { key: 'staffMembersIds' } },
          relations: ['guildStats'],
        });
        if (!guild || !guild.guildStats) {
          continue;
        }
        const staffMembersIds: string[] = guild.guildStats[0].value.split(',');
        if (staffMembersIds.includes(userId)) {
          guilds.push(guild);
        }
      } catch (err) {
        console.log(err);
        //
      }
    }

    return guilds;
  }

  findOne(id: string): Promise<Guild> {
    return this.guildRepository.findOne({
      where: { guildId: id },
    });
  }

  getGuildModuleLevel(guildId: string): Promise<GuildModuleLevel> {
    return this.guildModuleLevelService.findOne(guildId);
  }

  getGuildModuleBirthday(guildId: string): Promise<GuildModuleBirthday> {
    return this.guildModuleBirthdayService.findOne(guildId);
  }

  getGuildModuleQotd(guildId: string): Promise<GuildModuleQotd> {
    return this.guildModuleQotdService.findOne(guildId);
  }

  getGuildMessage(id: number): Promise<GuildMessage> {
    return this.guildMessageService.findOne(id);
  }

  getGuildMessages(guildId: string): Promise<GuildMessage[]> {
    return this.guildMessageService.findAllByGuild(guildId);
  }

  getGuildModuleVoiceGrowth(
    guildId: string,
  ): Promise<GuildModuleVoiceGrowth[]> {
    return this.guildModuleVoiceGrowthService.findAllByGuildId(guildId);
  }

  getGuildTranslation(guildId: string, key: string): Promise<GuildTranslation> {
    return this.guildTranslationService.findOne(guildId, key);
  }

  getGuildTranslations(guildId: string): Promise<GuildTranslation[]> {
    return this.guildTranslationService.findAllByGuild(guildId);
  }

  getMembers(guildId: string): Promise<Member[]> {
    return this.memberService.findAllByGuild(guildId);
  }

  getMember(guildId: string, userId: string): Promise<Member> {
    return this.memberService.findOne(userId, guildId);
  }

  async update(
    id: string,
    updateGuildInput: UpdateGuildInput,
  ): Promise<Guild> | null {
    const guild: Guild = await this.guildRepository.findOne({
      where: { guildId: id },
    });
    if (guild) {
      return this.guildRepository.save({
        ...guild,
        ...updateGuildInput,
      });
    }
    throw new Error('Guild not found');
  }

  async remove(id: string): Promise<Guild> | null {
    const guild: Guild = await this.guildRepository.findOne({
      where: { guildId: id },
    });
    if (guild) {
      return this.guildRepository.remove(guild);
    }
    throw new Error('Guild not found');
  }

  getDiscord(guildId: string): Discord {
    return this.discordService.create(guildId);
  }

  getStats(guildId: string): GuildStatResolved {
    return this.guildStatResolvedService.create(guildId);
  }

  getOpenAi(guildId: string): OpenAi {
    return this.openaiService.create(guildId);
  }
}
