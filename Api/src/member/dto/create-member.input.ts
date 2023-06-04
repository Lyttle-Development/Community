import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
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
