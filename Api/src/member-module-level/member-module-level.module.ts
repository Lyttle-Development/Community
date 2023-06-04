import { forwardRef, Module } from '@nestjs/common';
import { MemberModuleLevelService } from './member-module-level.service';
import { MemberModuleLevelResolver } from './member-module-level.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from '../member/member.module';
import { GuildModule } from '../guild/guild.module';
import { MemberModuleLevelDayModule } from '../member-module-level-day/member-module-level-day.module';
import { MemberModuleLevel } from './entities/member-module-level.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberModuleLevel]),
    forwardRef(() => MemberModuleLevelDayModule),
    forwardRef(() => MemberModule),
    forwardRef(() => GuildModule),
  ],
  providers: [MemberModuleLevelResolver, MemberModuleLevelService],
  exports: [MemberModuleLevelService],
})
export class MemberModuleLevelModule {}
