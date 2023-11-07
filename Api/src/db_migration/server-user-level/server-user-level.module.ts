import { forwardRef, Module } from '@nestjs/common';
import { ServerUserLevelService } from './server-user-level.service';
import { ServerUserLevelResolver } from './server-user-level.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerUserLevel } from './entities/server-user-level.entity';
import { MemberModuleLevelModule } from '../../db_primary/member-module-level/member-module-level.module';
import { MemberModule } from '../../db_primary/member/member.module';
import { GuildModule } from '../../db_primary/guild/guild.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerUserLevel], 'migration'),
    forwardRef(() => GuildModule),
    forwardRef(() => MemberModule),
    forwardRef(() => MemberModuleLevelModule),
  ],
  providers: [ServerUserLevelResolver, ServerUserLevelService],
  exports: [ServerUserLevelService],
})
export class ServerUserLevelModule {}
