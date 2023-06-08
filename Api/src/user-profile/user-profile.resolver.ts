import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserProfile } from './entities/user-profile.entity';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { User } from '../user/entities/user.entity';
import { UserProfileService } from './user-profile.service';

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Mutation(() => UserProfile)
  createUserProfile(
    @Args('createUserProfileInput')
    createUserProfileInput: CreateUserProfileInput,
  ): Promise<UserProfile> {
    return this.userProfileService.create(createUserProfileInput);
  }

  @Query(() => [UserProfile])
  findAll(): Promise<UserProfile[]> {
    return this.userProfileService.findAll();
  }

  @Query(() => UserProfile)
  findOne(@Args('id', { type: () => Int }) id: string): Promise<UserProfile> {
    return this.userProfileService.findOne(id);
  }

  @ResolveField(() => User)
  user(@Parent() userProfile: UserProfile): Promise<User> {
    return this.userProfileService.getUser(userProfile.userId);
  }

  @Mutation(() => UserProfile)
  updateUserProfile(
    @Args('updateUserProfileInput')
    updateUserProfileInput: UpdateUserProfileInput,
  ): Promise<UserProfile> | null {
    return this.userProfileService.update(
      updateUserProfileInput.user_id,
      updateUserProfileInput,
    );
  }

  @Mutation(() => UserProfile)
  removeUserProfile(
    @Args('id', { type: () => Int }) id: string,
  ): Promise<UserProfile> | null {
    return this.userProfileService.remove(id);
  }
}
