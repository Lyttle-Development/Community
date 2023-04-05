import { CreateGuildInput } from './create-guild.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildInput extends PartialType(CreateGuildInput) {}
