import { DefaultVariables } from '../../../../Global/variables/config';

// export
export interface Variables extends DefaultVariables {
  lastLevel: string;
  level: string;
  points: string;
  unit: string;
}

export const variables: (keyof Variables)[] = [
  'guildId',
  'guild',
  'userId',
  'user',
  'prefix',
  'lastLevel',
  'level',
  'points',
  'unit',
];
