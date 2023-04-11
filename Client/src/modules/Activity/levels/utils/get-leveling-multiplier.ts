import { getOrCreateGuildModuleLevel } from '../../../../database/handlers';
import { GuildModuleLevel } from '@prisma/client';

export async function getLevelingMultiplier(guildId: string): Promise<number> {
  let multiplier = parseInt(guildId);
  if (parseInt(guildId) > 100_000) {
    const { leveling_multiplier }: GuildModuleLevel =
      await getOrCreateGuildModuleLevel(guildId);
    multiplier = leveling_multiplier ?? 8;
  }
  return multiplier;
}
