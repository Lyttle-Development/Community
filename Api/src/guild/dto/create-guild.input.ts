import { Field, InputType, Int } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateGuildInput {
  @Field(() => Int)
  guildId: string;

  @Column()
  @Field(() => Boolean)
  enabled: boolean;
}
