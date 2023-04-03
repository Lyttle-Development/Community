// Emitted whenever a user subscribes to a guild scheduled event
async function error(err: Error): Promise<void> {
    console.error('!!!!! Client Error', err);
}

export default error;
