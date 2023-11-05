import { forwardRef, Module } from '@nestjs/common';
import { GuildModuleLevelService } from './guild-module-level.service';
import { GuildModuleLevelResolver } from './guild-module-level.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildModuleLevel } from './entities/guild-module-level.entity';
import { GuildModule } from '../guild/guild.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildModuleLevel]),
    forwardRef(() => GuildModule),
  ],
  providers: [GuildModuleLevelResolver, GuildModuleLevelService],
  exports: [GuildModuleLevelService],
})
export class GuildModuleLevelModule {}
