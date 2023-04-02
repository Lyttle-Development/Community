import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGuildInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
