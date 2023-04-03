import {executor, test} from '../../utils';
import {prefix as actionPrefix} from './';

// This file's prefix
const prefix: string = actionPrefix + 'onClientError.';

// The execute function
export async function onClientError(error: Error): Promise<void> {
  // All actions that should be executed
  const actions: Promise<any>[] = [executor(prefix + 'test', test, error)];

  // Execute all actions
  await Promise.all(actions);
}
