import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserProfile } from '../user-profile/entities/user-profile.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOne(@Args('id', { type: () => Int }) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @ResolveField(() => UserProfile)
  profile(@Parent() user: User): Promise<UserProfile> {
    return this.userService.getUserProfile(user.userId);
  }

  // currently not implemented
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> | null {
    return this.userService.update(updateUserInput.user_id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => Int }) id: string,
  ): Promise<User> | null {
    return this.userService.remove(id);
  }
}
