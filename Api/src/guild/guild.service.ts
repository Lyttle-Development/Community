import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateGuildInput } from './dto/create-guild.input';
import type { UpdateGuildInput } from './dto/update-guild.input';
import { Guild } from './entities/guild.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

@Injectable()
export class GuildService {
  constructor(
    @InjectRepository(Guild)
    private guildRepository: Repository<Guild>,
    @Inject(forwardRef(() => GuildModuleLevelService))
    private guildModuleLevelService: GuildModuleLevelService,
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
  ) {}

  create(createGuildInput: CreateGuildInput): Promise<Guild> {
    return this.guildRepository.save(createGuildInput);
  }

  findAll(): Promise<Guild[]> {
    return this.guildRepository.find({
      relations: ['guildMessages', 'members'],
    });
  }

  findOne(id: number): Promise<Guild> {
    return this.guildRepository.findOne({
      where: { guild_id: id },
      relations: ['guildMessages', 'members'],
    });
  }

  getGuildModuleLevel(guild_id: number): Promise<GuildModuleLevel> {
    return this.guildModuleLevelService.findOne(guild_id);
  }

  getGuildModuleQotd(guild_id: number): Promise<GuildModuleQotd> {
    return this.guildModuleQotdService.findOne(guild_id);
  }

  getGuildMessage(guild_id: number, id: number): Promise<GuildMessage> {
    return this.guildMessageService.findOneByGuildAndMessageId(guild_id, id);
  }

  getGuildMessages(guild_id: number): Promise<GuildMessage[]> {
    return this.guildMessageService.findAllByGuild(guild_id);
  }

  getGuildModuleVoiceGrowth(guild_id: number): Promise<GuildModuleVoiceGrowth> {
    return this.guildModuleVoiceGrowthService.findOne(guild_id);
  }

  getGuildTranslation(
    guild_id: number,
    key: string,
  ): Promise<GuildTranslation> {
    return this.guildTranslationService.findOne(guild_id, key);
  }

  getGuildTranslations(guild_id: number): Promise<GuildTranslation[]> {
    return this.guildTranslationService.findAllByGuild(guild_id);
  }

  getMembers(guild_id: number): Promise<Member[]> {
    return this.memberService.findAllByGuild(guild_id);
  }

  getMember(guild_id: number, user_id: number): Promise<Member> {
    return this.memberService.findOne(user_id, guild_id);
  }

  async update(
    id: number,
    updateGuildInput: UpdateGuildInput,
  ): Promise<Guild> | null {
    const guild: Guild = await this.guildRepository.findOne({
      where: { guild_id: id },
    });
    if (guild) {
      return this.guildRepository.save({
        ...guild,
        ...updateGuildInput,
      });
    }
    throw new Error('Guild not found');
  }

  async remove(id: number): Promise<Guild> | null {
    const guild: Guild = await this.guildRepository.findOne({
      where: { guild_id: id },
    });
    if (guild) {
      return this.guildRepository.remove(guild);
    }
    throw new Error('Guild not found');
  }
}
