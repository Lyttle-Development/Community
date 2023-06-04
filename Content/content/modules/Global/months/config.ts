import { DefaultVariables } from '../variables/config';

// export
export type Variables = DefaultVariables;

export const variables: (keyof Variables)[] = [
  'guildId',
  'guild',
  'userId',
  'user',
  'prefix',
];
