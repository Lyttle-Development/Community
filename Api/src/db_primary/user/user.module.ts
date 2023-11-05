import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfileModule } from 'db_primary/user-profile/user-profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserProfileModule),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
