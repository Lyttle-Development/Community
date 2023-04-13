import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';
import { User } from '../../user/entities/user.entity';
import { MemberModuleLevel } from '../../member-module-level/entities/member-module-level.entity';

@Entity()
@ObjectType()
export class Member {
  @PrimaryColumn()
  @ManyToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn()
  @ManyToOne(() => User, (user: User) => user.user_id)
  @Field(() => Int)
  user_id: number;

  @OneToOne(
    () => MemberModuleLevel,
    (memberModuleLevel: MemberModuleLevel) => memberModuleLevel.guild_id,
  )
  @Field(() => MemberModuleLevel)
  memberModuleLevel: MemberModuleLevel;

  @Column()
  @Field(() => Date)
  birthday_date: Date;

  @Column()
  @Field(() => Int)
  birthday: number;

  @Column()
  @Field(() => String)
  nickname: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
