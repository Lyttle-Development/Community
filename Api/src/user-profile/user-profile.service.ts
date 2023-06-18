import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateUserProfileInput } from './dto/create-user-profile.input';
import type { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  create(createUserProfileInput: CreateUserProfileInput): Promise<UserProfile> {
    return this.userProfileRepository.save(createUserProfileInput);
  }

  findAll(): Promise<UserProfile[]> {
    return this.userProfileRepository.find();
  }

  findOne(id: string): Promise<UserProfile> {
    return this.userProfileRepository.findOne({
      where: { userId: id },
    });
  }

  getUser(id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  async update(id: string, updateUserProfileInput: UpdateUserProfileInput) {
    const userProfile: UserProfile = await this.userProfileRepository.findOne({
      where: { userId: id },
    });
    if (userProfile) {
      return this.userProfileRepository.save({
        ...userProfile,
        ...updateUserProfileInput,
      });
    }
    throw new Error('UserProfile not found');
  }

  async remove(id: string): Promise<UserProfile> | null {
    const userProfile: UserProfile = await this.userProfileRepository.findOne({
      where: { userId: id },
    });
    if (userProfile) {
      return this.userProfileRepository.remove(userProfile);
    }
    throw new Error('UserProfile not found');
  }
}
