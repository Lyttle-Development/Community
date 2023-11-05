import { CreateUserProfileInput } from './create-user-profile.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserProfileInput extends PartialType(
  CreateUserProfileInput,
) {}
