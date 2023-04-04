import { sleep } from './sleep';

export async function test(...args) {
  console.log('test');
  await sleep(100);

  // randomly throw an error
  if (Math.random() < 0.3) {
    console.log('test error');
    throw new SyntaxError();
  }
  console.log('test done');
}