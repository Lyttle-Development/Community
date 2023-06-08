import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGuildActionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
