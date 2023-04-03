import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { PrimaryColumn } from 'typeorm/browser';

@Entity()
@ObjectType()
export class Member {
  @PrimaryColumn()
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn()
  @Field(() => Int)
  user_id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
