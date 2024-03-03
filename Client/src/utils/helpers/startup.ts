import { Client } from 'discord.js';
import { log } from '../log';
import { LogType } from '../../types';

export function startup(client: Client): void {
  log(LogType.INFO, `Logged in as ${client.user.tag}`);
}
