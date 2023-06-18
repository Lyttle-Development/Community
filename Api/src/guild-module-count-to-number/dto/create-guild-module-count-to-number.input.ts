import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateGuildModuleCountToNumberInput {
  @Field(() => String)
  guildId: string;

  @Field(() => String)
  channelId: string;

  @Column()
  @Field(() => Boolean)
  enabled: boolean;
}
