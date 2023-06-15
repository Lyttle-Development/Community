import { log } from '../log';
import { LogType } from '../../types';
import { checks } from './checks';

export const checksActive: boolean[] = checks.map(() => false);
export let doingChecks = false;

/**
 * Triggers all checks and executes them.
 */
export function triggerChecks() {
  // If checks are already running, skip
  if (doingChecks) return;
  // Set checks to running
  doingChecks = true;

  // Get index
  let ind = 0;

  // Loop through checks
  for (const check of checks) {
    // Check if check is valid
    if (!check) continue;
    if (typeof check !== 'function') continue;

    // Create action
    const action = async () => {
      // Copy index
      const myInd = parseInt(ind.toString());

      // If check is already running, skip
      if (checksActive[myInd]) return;
      // Set check to active
      checksActive[myInd] = true;

      // Run check contained.
      try {
        // Run check
        await check();
        // Catch any errors
      } catch (err) {
        // Log error
        log(LogType.ERROR, err);
      }

      // Set check to inactive
      checksActive[myInd] = false;
    };
    // Run check if not active
    if (!checksActive[ind]) void action();

    // Increment index
    ind++;
  }

  // Set checks to not running
  doingChecks = false;
}
