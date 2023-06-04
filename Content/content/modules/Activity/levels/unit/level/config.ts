import { DefaultVariables } from '../../../../Global/variables/config';

export type Variables = DefaultVariables;

export const variables: (keyof Variables)[] = [
  'guildId',
  'guild',
  'userId',
  'user',
  'prefix',
];
