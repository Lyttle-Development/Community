export enum LevelEvent {
  invite = 'invite',
  default = 'default',
  message = 'message',
  command = 'command',
  reaction = 'reaction',
  easterEgg = 'easterEgg',
  inCallTime = 'inCallTime',
  voiceUpdate = 'voiceUpdate',
  messageEdit = 'messageEdit',
  threadCreate = 'threadCreate',
  eventInterest = 'eventInterest',
}

export type LevelEventPrices = {
  [key in LevelEvent]: number;
};
