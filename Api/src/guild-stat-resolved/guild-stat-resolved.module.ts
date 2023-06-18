import { forwardRef, Module } from '@nestjs/common';
import { GuildStatResolvedService } from './guild-stat-resolved.service';
import { GuildStatResolvedResolver } from './guild-stat-resolved.resolver';
import { GuildStatModule } from '../guild-stat/guild-stat.module';

@Module({
  imports: [forwardRef(() => GuildStatModule)],
  providers: [GuildStatResolvedResolver, GuildStatResolvedService],
  exports: [GuildStatResolvedService],
})
export class GuildStatResolvedModule {}
