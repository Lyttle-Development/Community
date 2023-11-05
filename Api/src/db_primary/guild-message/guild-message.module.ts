import { forwardRef, Module } from '@nestjs/common';
import { GuildMessageService } from './guild-message.service';
import { GuildMessageResolver } from './guild-message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildMessage } from './entities/guild-message.entity';
import { GuildModule } from '../guild/guild.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildMessage]),
    forwardRef(() => GuildModule),
  ],
  providers: [GuildMessageResolver, GuildMessageService],
  exports: [GuildMessageService],
})
export class GuildMessageModule {}
