export enum LevelEvent {
  default = 'default',
  invite = 'invite',
  message = 'message',
  reaction = 'reaction',
  inCallTime = 'inCallTime',
  voiceUpdate = 'voiceUpdate',
  messageEdit = 'messageEdit',
  easterEgg = 'easterEgg',
  command = 'command',
  threadCreate = 'threadCreate',
  eventInterest = 'eventInterest',
}

export type LevelEventPrices = {
  [key in LevelEvent]: number;
};
