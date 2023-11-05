import { Module } from '@nestjs/common';
import { ServerUserService } from './server-user.service';
import { ServerUserResolver } from './server-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerUser } from './entities/server-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerUser], 'migration')],
  providers: [ServerUserResolver, ServerUserService],
  exports: [ServerUserService],
})
export class ServerUserModule {}
