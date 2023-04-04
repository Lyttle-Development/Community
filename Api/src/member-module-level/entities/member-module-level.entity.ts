import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('member__module__level')
@ObjectType()
export class MemberModuleLevel {
  @PrimaryColumn()
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn()
  @Field(() => Int)
  user_id: number;

  @Column()
  @Field(() => Boolean)
  in_call: boolean;

  @Column()
  @Field(() => Boolean)
  call_alone: boolean;

  @Column()
  @Field(() => Date)
  call_start: Date;

  @Column()
  @Field(() => Float)
  points: number;

  @Column()
  @Field(() => Float)
  points_available: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
