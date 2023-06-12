import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { MemberModuleLevel } from './MemberModuleLevel';

@Index(
  'member__module__level__day_user_id_guild_id_key',
  ['guildId', 'userId'],
  { unique: true },
)
@Index('member__module__level__day_pkey', ['guildId', 'userId'], {
  unique: true,
})
@Entity('member__module__level__day', { schema: 'public' })
export class MemberModuleLevelDay {
  @Column('bigint', { primary: true, name: 'user_id' })
  userId: string;

  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('integer', { name: 'points_monday', default: () => '0' })
  pointsMonday: number;

  @Column('integer', { name: 'points_tuesday', default: () => '0' })
  pointsTuesday: number;

  @Column('integer', { name: 'points_wednesday', default: () => '0' })
  pointsWednesday: number;

  @Column('integer', { name: 'points_thursday', default: () => '0' })
  pointsThursday: number;

  @Column('integer', { name: 'points_friday', default: () => '0' })
  pointsFriday: number;

  @Column('integer', { name: 'points_saturday', default: () => '0' })
  pointsSaturday: number;

  @Column('integer', { name: 'points_sunday', default: () => '0' })
  pointsSunday: number;

  @Column('integer', { name: 'points', default: () => '0' })
  points: number;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
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
  memberModuleLevel: MemberModuleLevel;
}
