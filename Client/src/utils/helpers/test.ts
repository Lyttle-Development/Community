import { sleep } from './sleep';

/**
 * Test function
 * @param args
 */
export async function test(...args) {
  // log(LogType.LOG, 'test');
  await sleep(100);

  // randomly throw an error
  // if (Math.random() < 0.3) {
  //   log(LogType.LOG, 'test error');
  //   throw new Error('test error');
  // }
  // log(LogType.LOG, 'test done');
}
