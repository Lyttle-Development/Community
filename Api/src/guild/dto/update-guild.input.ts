import { CreateGuildInput } from './create-guild.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildInput extends PartialType(CreateGuildInput) {
  @Field(() => Int)
  id: number;
}
