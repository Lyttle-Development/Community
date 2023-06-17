import { CreateGuildTranslationInput } from './create-guild-translation.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildTranslationInput extends PartialType(
  CreateGuildTranslationInput,
) {}
