import { GuildMember } from '../../../types';
import { checkActivity } from './check-activity';
import { givePoints } from './give-points';

/**
 * Trigger an event.
 * @param price
 * @param guildMember
 */
export async function triggerEvent(price: number, guildMember: GuildMember) {
  // Check and reset activity when needed.
  await checkActivity(guildMember);

  // Give the user the tokens.
  await givePoints(price, guildMember);
}
