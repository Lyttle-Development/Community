import { Injectable } from '@nestjs/common';
import { CreateGuildTranslationInput } from './dto/create-guild-translation.input';
import { UpdateGuildTranslationInput } from './dto/update-guild-translation.input';

@Injectable()
export class GuildTranslationService {
  create(createGuildTranslationInput: CreateGuildTranslationInput) {
    return 'This action adds a new guildTranslation';
  }

  findAll() {
    return `This action returns all guildTranslation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guildTranslation`;
  }

  update(id: number, updateGuildTranslationInput: UpdateGuildTranslationInput) {
    return `This action updates a #${id} guildTranslation`;
  }

  remove(id: number) {
    return `This action removes a #${id} guildTranslation`;
  }
}
