import { forwardRef, Module } from '@nestjs/common';
import { MemberModuleLevelDayService } from './member-module-level-day.service';
import { MemberModuleLevelDayResolver } from './member-module-level-day.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModuleLevelDay } from './entities/member-module-level-day.entity';
import { MemberModuleLevelModule } from '../member-module-level/member-module-level.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberModuleLevelDay]),
    forwardRef(() => MemberModuleLevelModule),
  ],
  providers: [MemberModuleLevelDayResolver, MemberModuleLevelDayService],
  exports: [MemberModuleLevelDayService],
})
export class MemberModuleLevelDayModule {}
