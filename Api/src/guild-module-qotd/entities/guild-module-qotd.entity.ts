import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Guild } from "../../guild/entities/guild.entity";

// TODO: Check against real database (what is and is not nullable)
@Entity('guild__module__qotd')
@ObjectType()
export class GuildModuleQotd {
  // Primary key information
  @PrimaryColumn({ type: 'bigint' })
  @Field(() => Float)
  guild_id: number;

  // Relations
  @OneToOne(() => Guild, (guild: Guild) => guild.guild_id)
  @Field(() => Guild)
  guild: Guild;

  // Values
  @Column()
  @Field(() => Boolean)
  enabled: boolean;

  @Column({ type: 'bigint' })
  @Field(() => Float)
  channel_id: number;

  @Column({ type: 'bigint' })
  @Field(() => Float)
  message_id: number;

  @Column()
  @Field(() => Boolean)
  nicknames: boolean;

  // Date information
  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
