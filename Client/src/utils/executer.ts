import * as fs from 'fs';
import { environment } from './environment';

export function executor(
  moduleName: string,
  moduleFunction: Function,
  ...args: any[]
): any {
  // Check if the module may be executed
  if (!mayExecute(moduleName)) return false;

  // Try to execute the module
  try {
    // Initialize result
    let result: any;

    // Execute the module
    result = moduleFunction(...args);

    // Return result
    return result;
  } catch (error) {
    // If the module fails, increase the error count
    setModule(moduleName, 1);
  }
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
    const disabled =
      modules[moduleName].errors >= environment.ALLOWED_ERROR_COUNT;

    // Check if the module is enabled and not disabled
    return enabled && !disabled;
  } catch (error) {
    // If not found, create it.
    setModule(moduleName);
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
      // Todo: Handle error: Send message to devs.
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

    // Write the modules.json file
    fs.writeFileSync(modulesPath, JSON.stringify(modules, null, 2));
  } catch (error) {
    // Todo: Handle error: Send message to devs.
  }
}