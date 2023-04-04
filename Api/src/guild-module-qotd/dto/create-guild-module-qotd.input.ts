import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleQotdInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
