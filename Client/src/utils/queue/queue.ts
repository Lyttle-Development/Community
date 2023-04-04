import { checkMessagesQueue } from './messagesQueue';
import { environment } from '../environment';
import { messageDevs } from '../helpers/messageDevs';

let queueActive = false;
let queueFree: boolean[] = [];
let queueInterval: NodeJS.Timeout;
const allowedRequestsPerSecond: number =
  parseInt(environment.ALLOWED_REQUESTS_SECOND) ?? 10;

export enum QueueBacklogType {
  CRITICAL = 'critical',
  URGENT = 'urgent',
  IMPORTANT = 'important',
  NORMAL = 'normal',
  LOW = 'low',
  BACKGROUND = 'background',
}

type QueueBacklogTypeItem = Function;

interface QueueBacklogTimeItem {
  time: number;
  action: Function;
}

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

export function initQueue() {
  if (queueActive || queueInterval) return;
  queueInterval = setInterval(() => {
    // Run queue
    fireQueues();

    // Tasks that need to be done every second
    checkMessagesQueue();
  }, 1000);
  queueActive = true;
}

function fireQueues() {
  for (let i = 0; i < allowedRequestsPerSecond; i++) {
    // Add to queue if not full
    if (queueFree.length < allowedRequestsPerSecond) {
      queueFree.push(true);
    }

    // Run queue if free
    if (queueFree[i]) {
      void Queue(i);
    }
  }
}

async function Queue(id) {
  queueFree[id] = false;
  try {
    await queueAction();
  } catch (error) {
    messageDevs(error, 'The error was caught in the main queue');
  }
  queueFree[id] = true;
}

async function queueAction() {
  if (backlog[QueueBacklogType.CRITICAL].length > 0) {
    const action = backlog[QueueBacklogType.CRITICAL].shift();
    await action();
    return;
  }

  if (backlog[QueueBacklogType.URGENT].length > 0) {
    const action = backlog[QueueBacklogType.URGENT].shift();
    await action();
    return;
  }

  if (backlog[QueueBacklogType.IMPORTANT].length > 0) {
    const action = backlog[QueueBacklogType.IMPORTANT].shift();
    await action();
    return;
  }

  if (backlog.time.length > 0 && backlog.time[0].time < Date.now()) {
    const { action } = backlog.time.shift();
    await action();
    return;
  }

  if (backlog.timeout.length > 0 && backlog.timeout[0].time < Date.now()) {
    const { action } = backlog.timeout.shift();
    await action();
    return;
  }

  if (backlog[QueueBacklogType.NORMAL].length > 0) {
    const action = backlog[QueueBacklogType.NORMAL].shift();
    await action();
    return;
  }

  if (backlog[QueueBacklogType.LOW].length > 0) {
    const action = backlog[QueueBacklogType.LOW].shift();
    await action();
    return;
  }

  if (backlog[QueueBacklogType.BACKGROUND].length > 0) {
    const action = backlog[QueueBacklogType.BACKGROUND].shift();
    await action();
    return;
  }
}

export function queue(importance: QueueBacklogType, action: Function) {
  backlog[importance].push(action);
}

export function queueAt(date: Date, action: Function) {
  backlog.time.push({ time: date.getTime(), action: action });
}

export function queueIn(ms: number, action: Function) {
  backlog.timeout.push({ time: Date.now() + ms, action: action });
}
