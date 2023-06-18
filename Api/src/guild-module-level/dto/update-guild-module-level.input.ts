import { CreateGuildModuleLevelInput } from './create-guild-module-level.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleLevelInput extends PartialType(
  CreateGuildModuleLevelInput,
) {}
