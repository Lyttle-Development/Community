export function isValidUrl(str: string): boolean {
  const regex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  const result = str.match(regex);
  return !!result;
}
