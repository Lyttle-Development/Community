import { DefaultVariables } from '../../../../Global/variables/config';

// export
export interface Variables extends DefaultVariables {
  time: number;
}

export const variables: (keyof Variables)[] = [
  'guildId',
  'guild',
  'userId',
  'user',
  'prefix',
  'time',
];
