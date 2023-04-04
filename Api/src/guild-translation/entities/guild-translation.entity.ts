import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('guild__translation')
@ObjectType()
export class GuildTranslation {
  @PrimaryColumn()
  @Field(() => Int)
  guild_id: number;

  @PrimaryColumn()
  @Field(() => String)
  key: string;

  @Column()
  @Field(() => String)
  value: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
