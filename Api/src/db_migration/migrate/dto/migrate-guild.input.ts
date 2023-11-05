import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class MigrateGuildInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
