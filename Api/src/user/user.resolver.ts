import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Profile } from '../profile/entities/profile.entity';

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
  findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @ResolveField(() => User)
  profile(@Args('id', { type: () => Int }) id: number): Promise<Profile> {
    return this.userService.getProfile(id);
  }

  // currently not implemented
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> | null {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> | null {
    return this.userService.remove(id);
  }
}
