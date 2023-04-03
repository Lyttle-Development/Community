import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildResolver } from './guild.resolver';

@Module({
  providers: [GuildResolver, GuildService]
})
export class GuildModule {}
