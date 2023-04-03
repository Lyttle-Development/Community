import { sleep } from './sleep';

export async function test(...args) {
  await sleep(100);

  // randomly throw an error
  if (Math.random() < 0.3) {
    throw new Error('Error!');
  }
}