import { forwardRef, Module } from '@nestjs/common';
import { GuildModuleBirthdayService } from './guild-module-birthday.service';
import { GuildModuleBirthdayResolver } from './guild-module-birthday.resolver';
import { GuildModule } from '../guild/guild.module';
import { GuildModuleBirthday } from './entities/guild-module-birthday.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuildModuleBirthday]),
    forwardRef(() => GuildModule),
  ],
  providers: [GuildModuleBirthdayResolver, GuildModuleBirthdayService],
  exports: [GuildModuleBirthdayService],
})
export class GuildModuleBirthdayModule {}
