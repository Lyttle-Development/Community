import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm/browser';

@Entity()
@ObjectType()
export class Guild {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  guild_id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
