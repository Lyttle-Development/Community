import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGuildModuleVoiceGrowthChildInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
