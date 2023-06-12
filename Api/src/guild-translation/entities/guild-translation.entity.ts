import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Index('guild__translation_pkey', ['guildId', 'key'], { unique: true })
@Entity('guild__translation', { schema: 'public' })
@ObjectType()
export class GuildTranslation {
  @Column('bigint', { primary: true, name: 'guild_id' })
  @Field(() => String)
  guildId: string;

  @Column('text', { primary: true, name: 'key' })
  @Field(() => String)
  key: string;

  @Column('text', { name: 'value' })
  @Field(() => String)
  value: string;

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

  @ManyToOne(() => Guild, (guild) => guild.guildTranslations, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  guild: Guild;
}
