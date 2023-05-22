export function getBirthDayInt(date: Date) {
  // Get month and day from date.
  const month = date.getMonth() + 1;
  // Get day from date.
  let day: number | string = date.getDate();
  // Add 0 to day if less than 10.
  day = day < 10 ? `0${day}` : day;

  // Return month and day as number.
  return parseInt(`${month}${day}`);
}
