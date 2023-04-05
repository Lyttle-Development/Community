import { Module } from '@nestjs/common';
import { MemberModuleLevelService } from './member-module-level.service';
import { MemberModuleLevelResolver } from './member-module-level.resolver';

@Module({
  providers: [MemberModuleLevelResolver, MemberModuleLevelService]
})
export class MemberModuleLevelModule {}
