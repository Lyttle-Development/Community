import * as fs from 'fs';
import { environment, sortObject } from './';
import { messageDevs } from './helpers/messageDevs';

export async function executor(
  moduleName: string,
  moduleFunction: (...args) => Promise<any>,
  ...args: any[]
): Promise<any> {
  let result = null;

  // Check if the module may be executed
  if (!mayExecute(moduleName)) return result;

  // Try to execute the module
  try {
    // Execute the module
    if (args.length === 0) result = await moduleFunction();
    else result = await moduleFunction(...args);
  } catch (error) {
    // If the module fails, increase the error count
    setModule(moduleName, 1);
    messageDevs(
      error,
      `The error was caught in the executor, the following module crashed: ${moduleName}`
    );
  }

  return result;
}

// The path to the modules.json file
const modulesPath: string = process.cwd() + '\\modules.json';
// Cached modules
let modules = {};

// Check if a module may be executed
function mayExecute(moduleName: string): boolean {
  // Try to get the module status.
  try {
    // Get enabled state
    const enabled = modules[moduleName].enabled === true;

    // Check if the module has too many errors
    const tooManyErrors =
      modules[moduleName].errors >= environment.ALLOWED_ERROR_COUNT;

    // Check if the module is enabled and not disabled
    return enabled && !tooManyErrors;
  } catch (error) {
    // If not found, create it.
    setModule(moduleName);
    return mayExecute(moduleName);
  }
}

// Set a module's status, storaged & cached
function setModule(moduleName: string, errors: number = 0): void {
  try {
    // Read the modules.json file otherwise keep the cached version
    try {
      const file = fs.readFileSync(modulesPath, 'utf8');
      modules = JSON.parse(file);
    } catch (error) {
      messageDevs(
        error,
        `This was executed in the "executor" i think it could not get the modules from json.`
      );
    }

    // Set the module's status
    try {
      modules[moduleName].errors += errors;
    } catch (error) {
      modules[moduleName] = { enabled: true, errors };
    }

    // Disable the module if it has too many errors
    if (modules[moduleName].errors >= environment.ALLOWED_ERROR_COUNT) {
      modules[moduleName].enabled = false;
    }

    modules = sortObject(modules);

    // Write the modules.json file
    fs.writeFileSync(modulesPath, JSON.stringify(modules, null, 2));
  } catch (error) {
    messageDevs(
      error,
      `This was executed in the "executor" i think it could not save the modules to json.`
    );
  }
}