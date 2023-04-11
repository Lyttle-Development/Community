import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateGuildInput {
  @Column()
  @Field(() => Boolean)
  enabled: boolean;
}
