import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGuildTranslationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
