import { Module } from '@nestjs/common';
import { GuildTranslationService } from './guild-translation.service';
import { GuildTranslationResolver } from './guild-translation.resolver';

@Module({
  providers: [GuildTranslationResolver, GuildTranslationService]
})
export class GuildTranslationModule {}
