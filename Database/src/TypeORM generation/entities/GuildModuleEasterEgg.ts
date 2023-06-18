import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Guild } from './Guild';

@Index('guild__module__easter_egg_pkey', ['guildId'], { unique: true })
@Entity('guild__module__easter_egg', { schema: 'public' })
export class GuildModuleEasterEgg {
  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'false' })
  enabled: boolean;

  @Column('timestamp without time zone', {
    name: 'last_joker',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastJoker: Date;

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

  @OneToOne(() => Guild, (guild) => guild.guildModuleEasterEgg, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;
}
