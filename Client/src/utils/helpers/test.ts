// sleep function
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function test(data = 'A', data2 = 'B') {
    // wait 1 second
    console.log('waiting 1 second...');

    await sleep(1000);

    // randomly throw an error
    if (Math.random() < 0.3) {
        console.log('Error!');
        throw new Error('Error!');
    }
    console.log(data, data2);
}