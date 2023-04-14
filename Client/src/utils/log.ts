import { LogType } from '../types';
import { setNumberLength } from './helpers/set-number-length';

export function log(type: LogType, ...messages) {
  // Get variables
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = setNumberLength(date.getMonth() + 1, 2);
  const dd = setNumberLength(date.getDate(), 2);
  const hh = setNumberLength(date.getHours(), 2);
  const min = setNumberLength(date.getMinutes(), 2);
  const sec = setNumberLength(date.getSeconds(), 2);
  const ms = setNumberLength(date.getMilliseconds(), 3);

  // Build strings
  const dateStr = `${dd}/${mm}/${yyyy}`;
  const timeStr = `${hh}:${min}:${sec}.${ms}`;
  const contentStr = messages.join('');

  let typeStr;
  switch (type) {
    case LogType.INFO:
      typeStr = 'INF';
      break;
    case LogType.WARN:
      typeStr = 'WRN';
      break;
    case LogType.ERROR:
      typeStr = 'ERR';
      break;
    default:
      typeStr = 'LOG';
      break;
  }

  // Build message
  const message = `${typeStr} [${dateStr} @ ${timeStr}]: ${contentStr}`;

  // Log to console
  console[type](message);
}
