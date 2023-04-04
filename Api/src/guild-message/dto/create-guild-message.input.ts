import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGuildMessageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
