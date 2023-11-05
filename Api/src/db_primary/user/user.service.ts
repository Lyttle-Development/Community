import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateUserInput } from './dto/create-user.input';
import type { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { UserProfileService } from '../user-profile/user-profile.service';
import type { CreateUserProfileInput } from '../user-profile/dto/create-user-profile.input';
import type { UserProfile } from '../user-profile/entities/user-profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => UserProfileService))
    private profileService: UserProfileService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const createProfileInput: CreateUserProfileInput = {
      user_id: createUserInput.user_id,
      tokens: 0,
      tokens_used: 0,
    };
    const userProfile: UserProfile = await this.profileService.create(
      createProfileInput,
    );
    const user: User = this.userRepository.create({
      ...createUserInput,
      userProfile: userProfile,
    });
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { userId: id },
    });
  }

  getUserProfile(id: string): Promise<UserProfile> {
    return this.profileService.findOne(id);
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> | null {
    const user: User = await this.userRepository.findOne({
      where: { userId: id },
    });
    if (user) {
      return this.userRepository.save({ ...user, ...updateUserInput });
    }
    throw new Error('User not found');
  }

  async remove(id: string): Promise<User> | null {
    const user: User = await this.userRepository.findOne({
      where: { userId: id },
    });
    if (user) {
      return this.userRepository.remove(user);
    }
    throw new Error('User not found');
  }
}
