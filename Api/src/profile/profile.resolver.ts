import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { User } from '../user/entities/user.entity';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<Profile> {
    return this.profileService.create(createProfileInput);
  }

  @Query(() => [Profile])
  findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Query(() => Profile)
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @ResolveField(() => User)
  user(@Parent() profile: Profile): Promise<User> {
    return this.profileService.getUser(profile.user_id);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ): Promise<Profile> | null {
    return this.profileService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @Mutation(() => Profile)
  removeProfile(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Profile> | null {
    return this.profileService.remove(id);
  }
}
