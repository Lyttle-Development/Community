import { CreateMemberInput } from './create-member.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMemberInput extends PartialType(CreateMemberInput) {}
