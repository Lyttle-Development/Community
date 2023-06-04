import { DefaultVariables } from '../../../../../Global/variables/config';

// export
export interface Variables extends DefaultVariables {
  recentLevels: string;
  levels: string;
  levelsUnit: string;
  nextLevel: string;
  points: string;
  pointsUnit: string;
  recentPoints: string;
  neededPointsNextLevel: string;
  timesHarder: string;
  stateText: string;
}

export const variables: (keyof Variables)[] = [
  'guildId',
  'guild',
  'userId',
  'user',
  'prefix',
  'recentLevels',
  'levels',
  'levelsUnit',
  'nextLevel',
  'points',
  'pointsUnit',
  'recentPoints',
  'neededPointsNextLevel',
  'timesHarder',
  'stateText',
];
