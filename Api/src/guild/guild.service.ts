import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGuildInput } from './dto/create-guild.input';
import { UpdateGuildInput } from './dto/update-guild.input';
import { Guild } from './entities/guild.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuildModuleLevelService } from '../guild-module-level/guild-module-level.service';
import { GuildModuleLevel } from '../guild-module-level/entities/guild-module-level.entity';
import { GuildModuleQotd } from '../guild-module-qotd/entities/guild-module-qotd.entity';
import { GuildModuleQotdService } from '../guild-module-qotd/guild-module-qotd.service';
import { GuildMessage } from '../guild-message/entities/guild-message.entity';
import { GuildMessageService } from '../guild-message/guild-message.service';
import { GuildTranslationService } from '../guild-translation/guild-translation.service';
import { GuildTranslation } from '../guild-translation/entities/guild-translation.entity';
import { MemberService } from 'src/member/member.service';

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

  getGuildModuleLevel(id: number): Promise<GuildModuleLevel> {
    return this.guildModuleLevelService.findOne(id);
  }

  getGuildModuleQotd(id: number): Promise<GuildModuleQotd> {
    return this.guildModuleQotdService.findOne(id);
  }

  getGuildMessage(id: number): Promise<GuildMessage> {
    return this.guildMessageService.findOne(id);
  }

  getGuildMessages(): Promise<GuildMessage[]> {
    return this.guildMessageService.findAll();
  }

  getGuildTranslation(id: number): Promise<GuildTranslation> {
    return this.guildTranslationService.findOne(id);
  }

  getGuildTranslations(): Promise<GuildTranslation[]> {
    return this.guildTranslationService.findAll();
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
