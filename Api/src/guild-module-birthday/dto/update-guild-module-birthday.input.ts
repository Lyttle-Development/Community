import { CreateGuildModuleBirthdayInput } from './create-guild-module-birthday.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGuildModuleBirthdayInput extends PartialType(
  CreateGuildModuleBirthdayInput,
) {
  @Field(() => String, { nullable: true })
  birthdayChannelId: string;
}
