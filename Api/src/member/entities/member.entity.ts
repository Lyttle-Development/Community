import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';
import { MemberModuleLevel } from '../../member-module-level/entities/member-module-level.entity';

@Index('member_user_id_guild_id_key', ['guildId', 'userId'], { unique: true })
@Index('member_pkey', ['guildId', 'userId'], { unique: true })
@Entity('member', { schema: 'public' })
@ObjectType()
export class Member {
  @Column('bigint', { primary: true, name: 'user_id' })
  @Field(() => String)
  userId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  @Field(() => String)
  guildId: string;

  @Column('integer', { name: 'birthday', nullable: true })
  @Field(() => Int, { nullable: true })
  birthday: number | null;

  @Column('text', { name: 'nickname', nullable: true })
  @Field(() => String, { nullable: true })
  nickname: string | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => Guild, (guild) => guild.members, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;

  @OneToOne(
    () => MemberModuleLevel,
    (memberModuleLevel) => memberModuleLevel.member,
    { nullable: true },
  )
  memberModuleLevel: MemberModuleLevel;
}
