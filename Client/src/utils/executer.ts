import * as fs from 'fs';
import { log, QueueBacklogType, sendMessage, sortObject } from './';
import { messageDevs } from './helpers';
import { ALLOWED_ERROR_COUNT, DEV_IDS } from '../../constants';
import { LogType } from '../types';
import * as path from 'path';
import client from '../main';

/**
 * The main module executor, it prevents the bot from hard crashing.
 * @param moduleName
 * @param moduleFunction
 * @param args
 */
export async function executor(
  moduleName: string,
  moduleFunction: ((...args) => Promise<() => void>) | ((...args) => void),
  ...args: unknown[]
) {
  let result = null;

  // Check if the module may be executed
  if (!mayExecute(moduleName)) return result;

  // Try to execute the module
  try {
    // Execute the module
    if (args.length === 0) {
      // If no arguments are given, execute the module without arguments
      result = await moduleFunction();
    } else {
      // If arguments are given, execute the module with arguments
      result = await moduleFunction(...args);
    }
  } catch (error) {
    // If the module fails, increase the error count
    setModule(moduleName, 1);

    // Log the error
    log(LogType.ERROR, error);

    // Send the error to the devs
    messageDevs(
      error,
      `The error was caught in the executor, the following module crashed: ${moduleName}`,
    );
  }

  // Return the result
  return result;
}

// The path to the modules.json file
const modulesPath: string = path.join(process.cwd(), 'modules.json');
// Cached modules

export interface ExecutorModules {
  [key: string]: {
    enabled: boolean;
    errors: number;
  };
}
export let executorModules: ExecutorModules = {};
export const crashedModules: string[] = [];
export const disabledModules: string[] = [];

// Check if a module may be executed
function mayExecute(moduleName: string): boolean {
  // Try to get the module status.
  try {
    // Get enabled state
    const enabled = executorModules[moduleName].enabled === true;

    // Check if the module has too many errors
    const tooManyErrors =
      executorModules[moduleName].errors >= ALLOWED_ERROR_COUNT;

    if (tooManyErrors && !crashedModules.includes(moduleName)) {
      crashedModules.push(moduleName);
      // send the message to the devs
      for (const dev of DEV_IDS) {
        const channel = client.users.resolve(dev);
        const message = `WARNING: The module "${moduleName}" has crashed too many times and has been disabled.`;
        void sendMessage(
          channel,
          message,
          true,
          false,
          QueueBacklogType.BACKGROUND,
        );
      }
    }

    if (!enabled && !disabledModules.includes(moduleName)) {
      disabledModules.push(moduleName);
      // send the message to the devs
      for (const dev of DEV_IDS) {
        const channel = client.users.resolve(dev);
        const message = `INFO: The module "${moduleName}" has been disabled.`;
        void sendMessage(
          channel,
          message,
          true,
          false,
          QueueBacklogType.BACKGROUND,
        );
      }
    }

    // Check if the module is enabled and not disabled
    return enabled && !tooManyErrors;
  } catch (error) {
    // If not found, create it.
    setModule(moduleName);

    // Retry the function
    return mayExecute(moduleName);
  }
}

// Set a module's status, storaged & cached
function setModule(moduleName: string, errors = 0): void {
  try {
    // Read the modules.json file otherwise keep the cached version
    try {
      const file = fs.readFileSync(modulesPath, 'utf8');
      executorModules = JSON.parse(file);
    } catch (error) {
      // If the file could not be read, log the error
      log(LogType.ERROR, error);

      // Send the error to the devs
      messageDevs(
        error,
        'This was executed in the "executor" i think it could not get the modules from json.',
      );
    }

    // Set the module's status
    try {
      // If the module exists, add the errors
      executorModules[moduleName].errors += errors;
    } catch (error) {
      // / If the module does not exist, create it
      executorModules[moduleName] = { enabled: true, errors };
    }

    // Disable the module if it has too many errors
    if (executorModules[moduleName].errors >= ALLOWED_ERROR_COUNT) {
      // Disable the module
      executorModules[moduleName].enabled = false;
    }

    // Sort the modules
    executorModules = sortObject(executorModules);

    // Write the modules.json file
    fs.writeFileSync(modulesPath, JSON.stringify(executorModules, null, 2));
  } catch (error) {
    // If the module could not be set, log the error
    log(LogType.ERROR, error);

    // Send the error to the devs
    messageDevs(
      error,
      'This was executed in the "executor" i think it could not save the modules to json.',
    );
  }
}
