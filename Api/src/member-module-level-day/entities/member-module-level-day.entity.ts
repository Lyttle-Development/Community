import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MemberModuleLevel } from '../../member-module-level/entities/member-module-level.entity';

@Entity('member__module__level_day')
@ObjectType()
export class MemberModuleLevelDay {
  @PrimaryColumn()
  @OneToOne(
    () => MemberModuleLevel,
    (memberModuleLevel: MemberModuleLevel) => memberModuleLevel.guild_id,
  )
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn()
  @OneToOne(
    () => MemberModuleLevel,
    (memberModuleLevel: MemberModuleLevel) => memberModuleLevel.user_id,
  )
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

  @Column()
  @Field(() => Int)
  points: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
