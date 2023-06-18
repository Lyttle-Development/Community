import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateGuildInput {
  @Field(() => String)
  guildId: string;

  @Column()
  @Field(() => Boolean)
  enabled: boolean;
}
