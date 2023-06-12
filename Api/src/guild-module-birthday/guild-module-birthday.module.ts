import { Module } from '@nestjs/common';
import { GuildModuleBirthdayService } from './guild-module-birthday.service';
import { GuildModuleBirthdayResolver } from './guild-module-birthday.resolver';

@Module({
  providers: [GuildModuleBirthdayResolver, GuildModuleBirthdayService]
})
export class GuildModuleBirthdayModule {}
