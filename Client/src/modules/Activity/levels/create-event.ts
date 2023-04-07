import { GuildMember, LevelEvent } from '../../../types';

export function createEvent(event: LevelEvent, guildMember: GuildMember) {
  console.log(event, guildMember);
}
