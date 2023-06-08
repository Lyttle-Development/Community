import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Guild } from './Guild';

@Index('guild__module__birthday_pkey', ['guildId'], { unique: true })
@Entity('guild__module__birthday', { schema: 'public' })
export class GuildModuleBirthday {
  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('boolean', { name: 'enabled', default: () => 'false' })
  enabled: boolean;

  @Column('bigint', { name: 'birthday_channel_id', nullable: true })
  birthdayChannelId: string | null;

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

  @OneToOne(() => Guild, (guild) => guild.guildModuleBirthday, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;
}
