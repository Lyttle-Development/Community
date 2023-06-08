import { CreateMemberModuleLevelInput } from './create-member-module-level.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMemberModuleLevelInput extends PartialType(
  CreateMemberModuleLevelInput,
) {
  @Field(() => Int)
  guildId: string;

  @Field(() => Int)
  userId: string;
}
