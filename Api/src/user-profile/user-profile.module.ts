import { forwardRef, Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileResolver } from './user-profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile]),
    forwardRef(() => UserModule),
  ],
  providers: [UserProfileResolver, UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
