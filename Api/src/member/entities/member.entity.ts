import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
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
  // Primary key information
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Float)
  guild_id: number;

  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Float)
  user_id: number;

  // Relations
  @ManyToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Guild)
  guild: Guild;

  @ManyToOne(() => User, (user: User) => user.user_id)
  @Field(() => User)
  user: User;

  @OneToOne(
    () => MemberModuleLevel,
    (memberModuleLevel: MemberModuleLevel) => memberModuleLevel.guild_id,
  )
  @Field(() => MemberModuleLevel)
  memberModuleLevel: MemberModuleLevel;

  // Values
  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  birthday_date: Date;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  birthday: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  nickname: string;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
