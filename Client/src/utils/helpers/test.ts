export function test(data, data2) {
  // randomly throw an error
  if (Math.random() < 0.1) {
    throw new Error('Error!');
  }
  console.log(data, data2);
}