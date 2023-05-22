import { forwardRef, Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { Member } from './entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildModule } from '../guild/guild.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), forwardRef(() => GuildModule)],
  providers: [MemberResolver, MemberService],
  exports: [MemberService],
})
export class MemberModule {}
