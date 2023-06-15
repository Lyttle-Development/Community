export let currentDay: string | null = null;
export let todayInt = 0;
export let todayIntInitiated = false;

export function setLocalStorageDay(): boolean {
  // Get date
  const today = new Date();
  const todayDay = today.getDay();
  let yesterDay = todayDay - 1;
  if (yesterDay < 0) yesterDay = 6;

  // copy last value
  const lastDay = currentDay?.slice() ?? '';

  // If a new day happend (after 11:00)
  if (today.getHours() >= 11) {
    // Set current day
    currentDay = today.toLocaleDateString();
  } else {
    // Set current day to yesterday
    if (today.getHours() >= 0) today.setDate(today.getDate() - 1);
    // Set current day
    currentDay = today.toLocaleDateString();
  }

  // Check new day
  const newDay = lastDay !== currentDay;

  // set todayInt
  todayInt = newDay ? todayDay : !lastDay ? yesterDay : todayInt;
  todayIntInitiated = true;

  // Check if last day is not equal to current day
  return newDay;
}
