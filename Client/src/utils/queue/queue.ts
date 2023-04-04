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

export enum QueueBacklogTimeType {
  TIME = 'time',
  TIMEOUT = 'timeout',
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

async function queueActionItem(type: QueueBacklogType) {
  if (backlog[type].length > 0) {
    const action = backlog[type].shift();
    await action();
    return true;
  }
  return false;
}

async function queueActionTimeItem(type: QueueBacklogTimeType) {
  if (backlog[type].length > 0 && backlog[type][0].time < Date.now()) {
    const { action } = backlog[type].shift();
    await action();
    return true;
  }
  return false;
}

async function queueAction() {
  // Run critical first
  if (await queueActionItem(QueueBacklogType.CRITICAL)) return;
  if (await queueActionItem(QueueBacklogType.URGENT)) return;
  if (await queueActionItem(QueueBacklogType.IMPORTANT)) return;

  // Run time based next
  if (await queueActionTimeItem(QueueBacklogTimeType.TIME)) return;
  if (await queueActionTimeItem(QueueBacklogTimeType.TIMEOUT)) return;

  // Run normal last
  if (await queueActionItem(QueueBacklogType.NORMAL)) return;
  if (await queueActionItem(QueueBacklogType.LOW)) return;
  if (await queueActionItem(QueueBacklogType.BACKGROUND)) return;
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
