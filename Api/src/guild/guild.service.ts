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
    return this.guildRepository.find();
  }

  findOne(id: string): Promise<Guild> {
    return this.guildRepository.findOne({
      where: { guildId: id },
    });
  }

  getGuildModuleLevel(guildId: string): Promise<GuildModuleLevel> {
    return this.guildModuleLevelService.findOne(guildId);
  }

  getGuildModuleQotd(guildId: string): Promise<GuildModuleQotd> {
    return this.guildModuleQotdService.findOne(guildId);
  }

  getGuildMessage(id: string): Promise<GuildMessage> {
    return this.guildMessageService.findOne(id);
  }

  getGuildMessages(guildId: string): Promise<GuildMessage[]> {
    return this.guildMessageService.findAllByGuild(guildId);
  }

  getGuildModuleVoiceGrowth(guildId: string): Promise<GuildModuleVoiceGrowth> {
    return this.guildModuleVoiceGrowthService.findOne(guildId);
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
}
