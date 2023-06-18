import { CreateGuildMessageInput } from './create-guild-message.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildMessageInput extends PartialType(
  CreateGuildMessageInput,
) {}
