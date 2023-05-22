import { forwardRef, Module } from '@nestjs/common';
import { MemberModuleLevelService } from './member-module-level.service';
import { MemberModuleLevelResolver } from './member-module-level.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberModuleLevelModule]),
    forwardRef(() => MemberModule),
  ],
  providers: [MemberModuleLevelResolver, MemberModuleLevelService],
  exports: [MemberModuleLevelService],
})
export class MemberModuleLevelModule {}
