import { forwardRef, Module } from '@nestjs/common';
import { GuildModuleQotdService } from './guild-module-qotd.service';
import { GuildModuleQotdResolver } from './guild-module-qotd.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildModuleQotd } from './entities/guild-module-qotd.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildModuleQotd]),
    forwardRef(() => GuildModuleQotdModule),
  ],
  providers: [GuildModuleQotdResolver, GuildModuleQotdService],
  exports: [GuildModuleQotdService],
})
export class GuildModuleQotdModule {}
