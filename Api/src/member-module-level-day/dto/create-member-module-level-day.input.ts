import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMemberModuleLevelDayInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
