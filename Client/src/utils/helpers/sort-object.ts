/**
 * Sorts an object by key
 * @param obj
 */
export function sortObject<T>(obj: T): T {
  // Get the keys and sort them
  const keys = Object.keys(obj).sort();

  // Create a new object
  const sortedObj: Partial<T> = {};

  // Reassign the keys
  keys.forEach((key) => {
    // Add the key to the new object
    sortedObj[key] = obj[key];
  });

  // Return the new object
  return sortedObj as T;
}
