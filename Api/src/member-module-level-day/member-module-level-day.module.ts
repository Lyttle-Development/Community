import { Module } from '@nestjs/common';
import { MemberModuleLevelDayService } from './member-module-level-day.service';
import { MemberModuleLevelDayResolver } from './member-module-level-day.resolver';

@Module({
  providers: [MemberModuleLevelDayResolver, MemberModuleLevelDayService]
})
export class MemberModuleLevelDayModule {}
