import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { MemberModuleLevel } from '../../member-module-level/entities/member-module-level.entity';

@Index(
  'member__module__level__day_user_id_guild_id_key',
  ['guildId', 'userId'],
  { unique: true },
)
@Index('member__module__level__day_pkey', ['guildId', 'userId'], {
  unique: true,
})
@Entity('member__module__level__day', { schema: 'public' })
@ObjectType()
export class MemberModuleLevelDay {
  @Column('bigint', { primary: true, name: 'user_id' })
  @Field(() => String)
  userId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  @Field(() => String)
  guildId: string;

  @Column('integer', { name: 'points_monday', default: () => '0' })
  @Field(() => Int)
  pointsMonday: number;

  @Column('integer', { name: 'points_tuesday', default: () => '0' })
  @Field(() => Int)
  pointsTuesday: number;

  @Column('integer', { name: 'points_wednesday', default: () => '0' })
  @Field(() => Int)
  pointsWednesday: number;

  @Column('integer', { name: 'points_thursday', default: () => '0' })
  @Field(() => Int)
  pointsThursday: number;

  @Column('integer', { name: 'points_friday', default: () => '0' })
  @Field(() => Int)
  pointsFriday: number;

  @Column('integer', { name: 'points_saturday', default: () => '0' })
  @Field(() => Int)
  pointsSaturday: number;

  @Column('integer', { name: 'points_sunday', default: () => '0' })
  @Field(() => Int)
  pointsSunday: number;

  @Column('integer', { name: 'points', default: () => '0' })
  @Field(() => Int)
  points: number;

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

  @OneToOne(
    () => MemberModuleLevel,
    (memberModuleLevel) => memberModuleLevel.memberModuleLevelDay,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'user_id', referencedColumnName: 'userId' },
    { name: 'guild_id', referencedColumnName: 'guildId' },
  ])
  @Field(() => MemberModuleLevel)
  memberModuleLevel: MemberModuleLevel;
}
