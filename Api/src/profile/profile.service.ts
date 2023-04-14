import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateProfileInput } from './dto/create-profile.input';
import type { UpdateProfileInput } from './dto/update-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  create(createProfileInput: CreateProfileInput): Promise<Profile> {
    return this.profileRepository.save(createProfileInput);
  }

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { user_id: id },
    });
  }

  getUser(id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  async update(id: number, updateProfileInput: UpdateProfileInput) {
    const profile: Profile = await this.profileRepository.findOne({
      where: { guild_id: id },
    });
    if (profile) {
      return this.profileRepository.save({
        ...profile,
        ...updateProfileInput,
      });
    }
    throw new Error('Profile not found');
  }

  async remove(id: number): Promise<Profile> | null {
    const profile: Profile = await this.profileRepository.findOne({
      where: { guild_id: id },
    });
    if (profile) {
      return this.profileRepository.remove(profile);
    }
    throw new Error('Profile not found');
  }
}
