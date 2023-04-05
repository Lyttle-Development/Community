import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from '../../member/entities/member.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryColumn()
  @Field(() => Int)
  guild_id: number;

  @OneToMany(() => Member, (member: Member) => member.guild_id)
  @Field(() => [Member])
  members: Member[];

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
