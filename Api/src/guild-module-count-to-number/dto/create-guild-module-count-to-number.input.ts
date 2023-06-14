import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleCountToNumberInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
