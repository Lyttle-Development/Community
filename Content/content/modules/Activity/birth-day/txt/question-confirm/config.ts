import { DefaultVariables } from '../../../../Global/variables/config';

// export
export interface Variables extends DefaultVariables {
  month: string;
  day: string;
}

export const variables: (keyof Variables)[] = [
  'guildId',
  'guild',
  'userId',
  'user',
  'prefix',
  'month',
  'day',
];
