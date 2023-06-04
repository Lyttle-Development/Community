import { DefaultVariables } from '../../../../Global/variables/config';

// export
export interface Variables extends DefaultVariables {
  recentLevels: string;
  levels: string;
  points: string;
  recentPoints: string;
  name: string;
}

export const variables: (keyof Variables)[] = [
  'guildId',
  'guild',
  'userId',
  'user',
  'prefix',
  'recentLevels',
  'levels',
  'points',
  'recentPoints',
  'name',
];
