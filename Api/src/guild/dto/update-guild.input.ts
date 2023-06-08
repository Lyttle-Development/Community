import { CreateGuildInput } from './create-guild.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildInput extends PartialType(CreateGuildInput) {
  @Field(() => Int)
  guildId: string;
}
