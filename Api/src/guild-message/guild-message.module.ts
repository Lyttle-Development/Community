import { Module } from '@nestjs/common';
import { GuildMessageService } from './guild-message.service';
import { GuildMessageResolver } from './guild-message.resolver';

@Module({
  providers: [GuildMessageResolver, GuildMessageService]
})
export class GuildMessageModule {}
