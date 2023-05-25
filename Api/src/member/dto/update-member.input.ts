import { CreateMemberInput } from './create-member.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMemberInput extends PartialType(CreateMemberInput) {
  @Field(() => Int)
  guild_id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => Date, { nullable: true })
  birthday_date: Date;

  @Field(() => Int, { nullable: true })
  birthday: number;

  @Field(() => String, { nullable: true })
  nickname: string;
}
