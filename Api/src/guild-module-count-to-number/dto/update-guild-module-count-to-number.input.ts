import { CreateGuildModuleCountToNumberInput } from './create-guild-module-count-to-number.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleCountToNumberInput extends PartialType(
  CreateGuildModuleCountToNumberInput,
) {}
