export function setNumberLength(number: number, length: number): string {
  // convert to string
  let str = number.toString();

  // Loop until the length is reached
  while (str.length < length) {
    // add a zero to the front
    str = `0${str}`;
  }

  // make sure the length is not exceeded
  str = str.substring(0, length);

  // return the string
  return str;
}
