import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGuildActionInput } from './dto/create-guild-action.input';
import { UpdateGuildActionInput } from './dto/update-guild-action.input';
import { GuildAction } from './entities/guild-action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';

@Injectable()
export class GuildActionService {
  constructor(
    @InjectRepository(GuildAction)
    private guildActionRepository: Repository<GuildAction>,
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
  ) {}

  async create(createGuildActionInput: CreateGuildActionInput) {
    const guildAction: GuildAction = await this.guildActionRepository.create(
      createGuildActionInput,
    );
    return this.guildActionRepository.save(guildAction);
  }

  findAll(): Promise<GuildAction[]> {
    return this.guildActionRepository.find();
  }

  findOne(id: number): Promise<GuildAction> {
    return this.guildActionRepository.findOne({ where: { id: id } });
  }

  getGuild(guildId: string): Promise<Guild> {
    return this.guildService.findOne(guildId);
  }

  async update(
    id: number,
    updateGuildActionInput: UpdateGuildActionInput,
  ): Promise<GuildAction> | null {
    const guildAction = await this.guildActionRepository.findOne({
      where: { id: id },
    });
    if (guildAction) {
      return this.guildActionRepository.save({
        ...guildAction,
        ...updateGuildActionInput,
      });
    }
    return null;
  }

  async remove(id: number): Promise<GuildAction> | null {
    const guildAction = await this.guildActionRepository.findOne({
      where: { id: id },
    });
    if (guildAction) {
      return this.guildActionRepository.remove(guildAction);
    }
    return null;
  }
}
