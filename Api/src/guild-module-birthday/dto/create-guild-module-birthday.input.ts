import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateGuildModuleBirthdayInput {
  @Field(() => String)
  guildId: string;

  @Column()
  @Field(() => Boolean)
  enabled: boolean;
}
