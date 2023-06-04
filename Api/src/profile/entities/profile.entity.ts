import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('profile')
@ObjectType()
export class Profile {
  // Primary key information
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Float)
  user_id: number;

  // Relations
  @OneToOne(() => User, (user: User) => user.user_id)
  @Field(() => User)
  user: User;

  // Values
  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  tokens: number;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  tokens_used: number;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
