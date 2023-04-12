export function sortObject(obj: any) {
  const keys = Object.keys(obj).sort();
  const sortedObj: any = {};
  keys.forEach((key) => {
    sortedObj[key] = obj[key];
  });
  return sortedObj;
}