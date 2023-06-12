import { forwardRef, Module } from '@nestjs/common';
import { GuildActionService } from './guild-action.service';
import { GuildActionResolver } from './guild-action.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildAction } from './entities/guild-action.entity';
import { GuildModule } from '../guild/guild.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildAction]),
    forwardRef(() => GuildModule),
  ],
  providers: [GuildActionResolver, GuildActionService],
  exports: [GuildActionService],
})
export class GuildActionModule {}
