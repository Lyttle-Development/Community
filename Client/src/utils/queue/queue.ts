import { checkMessagesQueue } from './messages-queue';
import { messageDevs } from '../helpers';
import { ALLOWED_REQUESTS_SECOND } from '../../../constants';

// Weather the queue is active or not
let queueActive = false;

// The queue jobs state
const queueFree: boolean[] = [];

// The queue interval
let queueInterval: NodeJS.Timeout;

// The queue types
export enum QueueBacklogType {
  CRITICAL = 'critical',
  URGENT = 'urgent',
  IMPORTANT = 'important',
  NORMAL = 'normal',
  LOW = 'low',
  BACKGROUND = 'background',
}

// The queue time types
export enum QueueBacklogTimeType {
  TIME = 'time',
  TIMEOUT = 'timeout',
}

// The queue backlog item type
type QueueBacklogTypeItem = () => Promise<unknown> | unknown;

// The queue backlog time item type
interface QueueBacklogTimeItem {
  time: number;
  action: () => Promise<unknown> | unknown;
}

// The queue backlog type
interface QueueBacklog {
  [QueueBacklogType.CRITICAL]: QueueBacklogTypeItem[];
  [QueueBacklogType.URGENT]: QueueBacklogTypeItem[];
  [QueueBacklogType.IMPORTANT]: QueueBacklogTypeItem[];
  [QueueBacklogType.NORMAL]: QueueBacklogTypeItem[];
  [QueueBacklogType.LOW]: QueueBacklogTypeItem[];
  [QueueBacklogType.BACKGROUND]: QueueBacklogTypeItem[];
  time: QueueBacklogTimeItem[];
  timeout: QueueBacklogTimeItem[];
}

// The queue backlog
const backlog: QueueBacklog = {
  [QueueBacklogType.CRITICAL]: [],
  [QueueBacklogType.URGENT]: [],
  [QueueBacklogType.IMPORTANT]: [],
  [QueueBacklogType.NORMAL]: [],
  [QueueBacklogType.LOW]: [],
  [QueueBacklogType.BACKGROUND]: [],
  time: [],
  timeout: [],
};

/**
 * Initialize the queue
 */
export function initQueue() {
  // Check if the queue is already active
  if (queueActive || queueInterval) return;

  // Start the queue
  queueInterval = setInterval(() => {
    // Run queue
    fireJobs();

    // Tasks that need to be done every second
    checkMessagesQueue();
  }, 1000);

  // Set the queue to active
  queueActive = true;
}

/**
 * Fire all jobs
 */
function fireJobs() {
  for (let i = 0; i < ALLOWED_REQUESTS_SECOND; i++) {
    // Add to queue if not full
    if (queueFree.length < ALLOWED_REQUESTS_SECOND) {
      queueFree.push(true);
    }

    // Run queue if free
    if (queueFree[i]) {
      void fireJob(i);
    }
  }
}

/**
 * Fire a job
 * @param id
 */
async function fireJob(id) {
  // Set the queue to busy
  queueFree[id] = false;
  try {
    // Run the job
    await job();

    // Catch any errors
  } catch (error) {
    // Log the error
    console.log(error);

    // Send the error to the devs
    messageDevs(error, 'The error was caught in the main queue');
  }

  // Set the queue to free
  queueFree[id] = true;
}

/**
 * The job, to be executed.
 */
async function job() {
  // Run critical first
  if (await fireAction(QueueBacklogType.CRITICAL)) return;
  if (await fireAction(QueueBacklogType.URGENT)) return;
  if (await fireAction(QueueBacklogType.IMPORTANT)) return;

  // Run time based next
  if (await fireTimeAction(QueueBacklogTimeType.TIME)) return;
  if (await fireTimeAction(QueueBacklogTimeType.TIMEOUT)) return;

  // Run normal last
  if (await fireAction(QueueBacklogType.NORMAL)) return;
  if (await fireAction(QueueBacklogType.LOW)) return;
  if (await fireAction(QueueBacklogType.BACKGROUND)) return;
}

/**
 * Fire an action
 * @param type
 */
async function fireAction(type: QueueBacklogType) {
  // Check if there is an action to run
  if (backlog[type].length > 0) {
    // Get the action, and remove it from the queue
    const action = backlog[type].shift();

    // Run the action
    await action();

    // Return true, thus stopping this job.
    return true;
  }

  // Return false, thus continuing this job. Allowing a lesser important job to run.
  return false;
}

/**
 * Fire a time based action
 * @param type
 */
async function fireTimeAction(type: QueueBacklogTimeType) {
  // Check if there is an action to run
  if (backlog[type].length > 0 && backlog[type][0].time < Date.now()) {
    // Get the action, and remove it from the queue
    const { action } = backlog[type].shift();

    // Run the action
    await action();

    // Return true, thus stopping this job.
    return true;
  }

  // Return false, thus continuing this job. Allowing a lesser important job to run.
  return false;
}

/**
 * Add an action to the queue
 * @param importance
 * @param action
 */
export function queue(
  importance: QueueBacklogType,
  action: () => Promise<unknown> | unknown,
): void {
  // Add to the queue
  backlog[importance].push(action);
}

/**
 * Add an action to the queue at a specific time
 * @param date
 * @param action
 */
export function queueAt(
  date: Date,
  action: () => Promise<unknown> | unknown,
): void {
  // Add to the queue
  backlog.time.push({ time: date.getTime(), action: action });

  // Sort the queue, this to prioritize the actions that need to be done first
  backlog.time.sort((a, b) => a.time - b.time);
}

/**
 * Add an action to the queue in a specific amount of time
 * @param ms
 * @param action
 */
export function queueIn(
  ms: number,
  action: () => Promise<unknown> | unknown,
): void {
  // Add to the queue
  backlog.timeout.push({ time: Date.now() + ms, action: action });

  // Sort the queue, this to prioritize the actions that need to be done first
  backlog.timeout.sort((a, b) => a.time - b.time);
}
