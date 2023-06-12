import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleCountToNumberInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
