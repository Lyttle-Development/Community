import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Profile {
  @PrimaryColumn()
  @OneToOne(() => User, { cascade: true })
  @Field(() => Int)
  guild_id: number;

  @Column()
  @Field(() => Int)
  tokens: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
