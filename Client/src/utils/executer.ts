export function executor(moduleFunction: Function, ...args: any[]): any {
  try {
    const r = moduleFunction(...args);
    console.log('Success!');
    return r;
  } catch (error) {
    console.log('Error!');
    console.error(error);
  }
}