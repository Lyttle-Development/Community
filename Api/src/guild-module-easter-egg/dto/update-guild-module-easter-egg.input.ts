import { CreateGuildModuleEasterEggInput } from './create-guild-module-easter-egg.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleEasterEggInput extends PartialType(
  CreateGuildModuleEasterEggInput,
) {}
