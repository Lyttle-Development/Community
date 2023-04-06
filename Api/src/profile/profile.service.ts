import { Injectable } from '@nestjs/common';
import type { CreateProfileInput } from './dto/create-profile.input';
import type { UpdateProfileInput } from './dto/update-profile.input';

import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import type { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  create(createProfileInput: CreateProfileInput): Promise<Profile> {
    return this.profileRepository.save(createProfileInput);
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
