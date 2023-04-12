import { Field, InputType, Int } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateProfileInput {
  @Column()
  @Field(() => Int)
  user_id: number;

  @Column()
  @Field(() => Int)
  tokens: number;
}
