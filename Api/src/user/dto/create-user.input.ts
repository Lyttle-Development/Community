import { Field, InputType, Int } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateUserInput {
  @Column()
  @Field(() => Int)
  user_id: number;
}
