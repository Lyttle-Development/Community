import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Index('guild__module__easter_egg_pkey', ['guildId'], { unique: true })
@Entity('guild__module__easter_egg', { schema: 'public' })
@ObjectType()
export class GuildModuleEasterEgg {
  @Column('bigint', { primary: true, name: 'guild_id' })
  @Field(() => Int)
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'false' })
  @Field(() => Boolean)
  enabled: boolean;

  @Column('timestamp without time zone', {
    name: 'last_joker',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  lastJoker: Date;

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

  @OneToOne(() => Guild, (guild) => guild.guildModuleEasterEgg, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  @Field(() => Guild)
  guild: Guild;
}
