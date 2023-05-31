import { forwardRef, Module } from '@nestjs/common';
import { GuildModuleQotdService } from './guild-module-qotd.service';
import { GuildModuleQotdResolver } from './guild-module-qotd.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildModuleQotd } from './entities/guild-module-qotd.entity';
import { GuildModule } from '../guild/guild.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildModuleQotd]),
    forwardRef(() => GuildModule),
  ],
  providers: [GuildModuleQotdResolver, GuildModuleQotdService],
  exports: [GuildModuleQotdService],
})
export class GuildModuleQotdModule {}
