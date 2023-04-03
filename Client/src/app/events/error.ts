import { onClientError } from '../actions';

async function error(error: Error): Promise<void> {
  await onClientError(error);
}

export default error;
