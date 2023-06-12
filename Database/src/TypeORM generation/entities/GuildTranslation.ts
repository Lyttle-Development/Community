import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Guild } from './Guild';

@Index('guild__translation_pkey', ['guildId', 'key'], { unique: true })
@Entity('guild__translation', { schema: 'public' })
export class GuildTranslation {
  @Column('bigint', { primary: true, name: 'guild_id' })
  guildId: string;

  @Column('text', { primary: true, name: 'key' })
  key: string;

  @Column('text', { name: 'value' })
  value: string;

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

  @ManyToOne(() => Guild, (guild) => guild.guildTranslations, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;
}
