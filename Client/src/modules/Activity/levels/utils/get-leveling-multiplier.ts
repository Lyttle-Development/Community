import { getOrCreateGuildModuleLevel } from '../../../../database/handlers';
import { GuildModuleLevel } from '@prisma/client';

/**
 * Get the leveling multiplier for a guild
 * - Checks the guild id and if it's over 100_000 it will get the multiplier from the database
 * - If its below 100_000 it will return the guild id as the multiplier
 * - If none is found it will return 8 (the default)
 * @param guildId
 */
export async function getLevelingMultiplier(guildId: string): Promise<number> {
  // parse the multiplier
  let multiplier = parseInt(guildId);

  // if the multiplier is over 100_000 it will get the multiplier from the database
  if (parseInt(guildId) > 100_000) {
    // get the multiplier from the database
    const { leveling_multiplier }: GuildModuleLevel =
      await getOrCreateGuildModuleLevel(guildId);
    // set the multiplier to the database multiplier or 8 if none is found
    multiplier = leveling_multiplier ?? 8;
  }

  // return the multiplier
  return multiplier;
}
