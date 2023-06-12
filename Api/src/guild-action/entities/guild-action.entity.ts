import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Guild } from '../../guild/entities/guild.entity';

@Index('guild__action_pkey', ['id'], { unique: true })
@Entity('guild__action', { schema: 'public' })
@ObjectType()
export class GuildAction {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Column('text', { name: 'key' })
  @Field(() => String)
  key: string;

  @Column('text', { name: 'values' })
  @Field(() => String)
  values: string;

  @Column('boolean', { name: 'executed', default: () => 'false' })
  @Field(() => Boolean)
  executed: boolean;

  @Column('bigint', { name: 'guild_id' })
  @Field(() => String)
  guildId: string;

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

  @ManyToOne(() => Guild, (guild) => guild.guildActions, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'guild_id', referencedColumnName: 'guildId' }])
  @Field(() => Guild)
  guild: Guild;
}
