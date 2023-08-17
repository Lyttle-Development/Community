export const getVariables = (
  module: any,
): {
  variable: string;
  description: string;
}[] => {
  const variables = (module?.variables as string[]) ?? [];
  return variables.map((variable) => ({
    variable: variable,
    description: variableDescriptions[variable] ?? 'No description provided.',
  }));
};

const variableDescriptions: { [key: string]: string } = {
  guildId: 'The ID of the guild.',
  enabled: 'Whether the module is enabled or not.',
  levelingMultiplier: 'The leveling multiplier.',
  guild: 'The guild.',
  userId: 'The ID of the user.',
  user: 'The user.',
  prefix: 'The prefix of the guild.',
  lastLevel: 'The last level of the user.',
  lastPoints: 'The last points of the user.',
  level: 'The level of the user.',
  levels: 'The levels of the user.',
  points: 'The points of the user.',
  unit: 'The unit used in this context. For example 1 "level" or 2 "levels".',
  recentLevels: 'The recent levels of the user.',
  recentPoints: 'The recent points of the user.',
  name: 'The name of the current context.',
  levelsUnit: 'Level or Levels',
  nextLevel: 'The next level of the user.',
  neededPointsNextLevel: 'The needed points for the next level of the user.',
  timesHarder: 'The times harder the next level is.',
  pointsUnit: 'Point or Points',
  stateText: 'The state text for current context.',
};
