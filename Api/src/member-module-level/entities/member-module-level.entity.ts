import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from '../../member/entities/member.entity';

@Entity('member__module__level')
@ObjectType()
export class MemberModuleLevel {
  @PrimaryColumn()
  @OneToOne(() => Member, (member: Member) => member.guild_id)
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn()
  @OneToOne(() => Member, (member: Member) => member.user_id)
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

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
