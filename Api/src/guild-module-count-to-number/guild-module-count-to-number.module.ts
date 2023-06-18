import { forwardRef, Module } from '@nestjs/common';
import { GuildModuleCountToNumberService } from './guild-module-count-to-number.service';
import { GuildModuleCountToNumberResolver } from './guild-module-count-to-number.resolver';
import { GuildModuleCountToNumber } from './entities/guild-module-count-to-number.entity';
import { GuildModule } from '../guild/guild.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildModuleCountToNumber]),
    forwardRef(() => GuildModule),
  ],
  providers: [
    GuildModuleCountToNumberResolver,
    GuildModuleCountToNumberService,
  ],
  exports: [GuildModuleCountToNumberService],
})
export class GuildModuleCountToNumberModule {}
