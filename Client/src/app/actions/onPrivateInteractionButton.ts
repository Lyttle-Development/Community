import { executor, test } from '../../utils';
import { actionPrefix } from './index';
import { ButtonInteraction } from 'discord.js';

// This file's prefix
const prefix: string = actionPrefix + 'onPrivateInteractionButton.';

// The execute function
export async function onPrivateInteractionButton(
  userId: string,
  interaction: ButtonInteraction,
): Promise<void> {
  // All actions that should be executed
  const actions: Promise<() => void>[] = [
    executor(prefix + 'test', test, userId, interaction),
  ];

  // Execute all actions
  await Promise.all(actions);
}
