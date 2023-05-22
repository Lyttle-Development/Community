import { forwardRef, Module } from '@nestjs/common';
import { GuildTranslationService } from './guild-translation.service';
import { GuildTranslationResolver } from './guild-translation.resolver';
import { GuildModule } from '../guild/guild.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildTranslation } from './entities/guild-translation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildTranslation]),
    forwardRef(() => GuildModule),
  ],
  providers: [GuildTranslationResolver, GuildTranslationService],
  exports: [GuildTranslationService],
})
export class GuildTranslationModule {}
