import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Member {
  @PrimaryColumn()
  @ManyToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn()
  @ManyToOne(() => User, (user: User) => user.guild_id)
  @Field(() => Int)
  user_id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
