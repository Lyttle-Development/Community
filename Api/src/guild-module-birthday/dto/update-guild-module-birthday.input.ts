import { CreateGuildModuleBirthdayInput } from './create-guild-module-birthday.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleBirthdayInput extends PartialType(
  CreateGuildModuleBirthdayInput,
) {}
