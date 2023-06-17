import { Resolver } from '@nestjs/graphql';
import { GuildStat } from './entities/guild-stat.entity';

@Resolver(() => GuildStat)
export class GuildStatResolver {}
