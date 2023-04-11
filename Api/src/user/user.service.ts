import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { CreateUserInput } from './dto/create-user.input';
import type { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import type { CreateProfileInput } from '../profile/dto/create-profile.input';
import type { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => ProfileService))
    private profileService: ProfileService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const createProfileInput: CreateProfileInput = {
      guild_id: createUserInput.guild_id,
      tokens: 0,
    };
    const profile: Profile = await this.profileService.create(
      createProfileInput,
    );
    const user: User = this.userRepository.create({
      ...createUserInput,
      profile: profile,
    });
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { guild_id: id },
    });
  }

  getProfile(id: number): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  // currently not implemented
  async update(id: number, updateUserInput: UpdateUserInput): Promise<String> {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<User> | null {
    const user: User = await this.userRepository.findOne({
      where: { guild_id: id },
    });
    if (user) {
      return this.userRepository.remove(user);
    }
    throw new Error('User not found');
  }
}
