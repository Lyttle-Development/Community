import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfileModule } from 'profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ProfileModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
