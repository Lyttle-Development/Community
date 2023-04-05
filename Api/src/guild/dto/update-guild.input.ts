import { CreateGuildInput } from './create-guild.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class UpdateGuildInput extends PartialType(CreateGuildInput) {
  @Column()
  @Field(() => Boolean)
  enabled: boolean;
}
