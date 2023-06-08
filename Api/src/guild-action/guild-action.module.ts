import { Module } from '@nestjs/common';
import { GuildActionService } from './guild-action.service';
import { GuildActionResolver } from './guild-action.resolver';

@Module({
  providers: [GuildActionResolver, GuildActionService]
})
export class GuildActionModule {}
