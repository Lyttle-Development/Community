import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('member__module__level_day')
@ObjectType()
export class MemberModuleLevelDay {
  @PrimaryColumn()
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn()
  @Field(() => Int)
  user_id: number;

  @Column()
  @Field(() => Int)
  points_mon: number;

  @Column()
  @Field(() => Int)
  points_tue: number;

  @Column()
  @Field(() => Int)
  points_wed: number;

  @Column()
  @Field(() => Int)
  points_thu: number;

  @Column()
  @Field(() => Int)
  points_fri: number;

  @Column()
  @Field(() => Int)
  points_sat: number;

  @Column()
  @Field(() => Int)
  points_sun: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
