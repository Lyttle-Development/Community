import {
  changeKeys,
  changeKeysValuesArray,
} from '@lyttledev-dashboard/components/review/review.config';
import { ChangeObject } from '@lyttledev-dashboard/contexts/app-hooks';

enum QueryVariableType {
  String = 'string',
  Boolean = 'boolean',
  Number = 'number',
}

interface ReviewBuilderMutationOptions {
  name: string;
  requiresGuildId: boolean;
  translation?: boolean;
  variablesName: string;
  variables: {
    [key: string]: QueryVariableType;
  };
}

interface ReviewBuilderMutation {
  [key: string]: ReviewBuilderMutationOptions;
}

interface reviewBuilderInfo {
  [key: string]: {
    query: ReviewBuilderMutationOptions;
    variable: string;
    booleanNull?: boolean;
  };
}

export interface ReviewBuilderQuery {
  [key: string]: {
    name: string;
    variablesName: string;
    variables: {
      [key: string]: string | boolean | number | null;
    };
  };
}

export const reviewBuilderMutations: ReviewBuilderMutation = {
  updateGuild: {
    name: 'updateGuild',
    requiresGuildId: true,
    variablesName: 'updateGuildInput',
    variables: {
      guildId: QueryVariableType.String,
      enabled: QueryVariableType.Boolean,
    },
  },
  updateGuildModuleLevel: {
    name: 'updateGuildModuleLevel',
    requiresGuildId: true,
    variablesName: 'updateGuildModuleLevelInput',
    variables: {
      guildId: QueryVariableType.String,
      enabled: QueryVariableType.Boolean,
      levelingMultiplier: QueryVariableType.Number,
      announcementChannelId: QueryVariableType.String,
      leaderboardChannelId: QueryVariableType.String,
      leaderboardLastWeek: QueryVariableType.String,
      nicknames: QueryVariableType.Boolean,
      lastLeaderboard: QueryVariableType.String,
    },
  },
  updateGuildModuleBirthday: {
    name: 'updateGuildModuleBirthday',
    requiresGuildId: true,
    variablesName: 'updateGuildModuleBirthdayInput',
    variables: {
      guildId: QueryVariableType.String,
      enabled: QueryVariableType.Boolean,
      channelId: QueryVariableType.String,
    },
  },
  createGuildTranslation: {
    name: 'createGuildTranslation',
    requiresGuildId: true,
    translation: true,
    variablesName: 'createGuildTranslationInput',
    variables: {
      guildId: QueryVariableType.String,
      key: QueryVariableType.String,
      value: QueryVariableType.String,
    },
  },
};

export const reviewBuilderInfo: reviewBuilderInfo = {
  [changeKeys.server.key]: {
    query: reviewBuilderMutations.updateGuild,
    variable: 'enabled',
  },
  [changeKeys.modulesLevels.key]: {
    query: reviewBuilderMutations.updateGuildModuleLevel,
    variable: 'enabled',
  },
  [changeKeys.moduleLevelsLevelUp.key]: {
    query: reviewBuilderMutations.updateGuildModuleLevel,
    variable: 'enabled',
  },
  [changeKeys.moduleLevelsLevelUpText.key]: {
    query: reviewBuilderMutations.createGuildTranslation,
    variable: 'value',
  },
  [changeKeys.moduleLevelsAnnouncement.key]: {
    query: reviewBuilderMutations.updateGuildModuleLevel,
    variable: 'announcementChannelId',
    booleanNull: true,
  },
  [changeKeys.moduleLevelsLeaderboard.key]: {
    query: reviewBuilderMutations.updateGuildModuleLevel,
    variable: 'leaderboardChannelId',
    booleanNull: true,
  },
  [changeKeys.moduleLevelsNickname.key]: {
    query: reviewBuilderMutations.updateGuildModuleLevel,
    variable: 'nicknames',
  },
  [changeKeys.moduleLevelsNicknameText.key]: {
    query: reviewBuilderMutations.createGuildTranslation,
    variable: 'value',
  },
  [changeKeys.moduleBirthday.key]: {
    query: reviewBuilderMutations.updateGuildModuleBirthday,
    variable: 'enabled',
  },
  [changeKeys.moduleBirthdayChannel.key]: {
    query: reviewBuilderMutations.updateGuildModuleBirthday,
    variable: 'channelId',
    booleanNull: true,
  },
  [changeKeys.moduleBirthdayText.key]: {
    query: reviewBuilderMutations.createGuildTranslation,
    variable: 'value',
  },
};

const reviewBuilderInfoKeys = Object.keys(reviewBuilderInfo);

export function reviewBuilder(
  guildId: string | null,
  changes: [string, ChangeObject][],
) {
  // Check for missing keys
  const missingKeys = changeKeysValuesArray.filter(
    // Keys from changeKeys is inside reviewBuilderInfoKeys? If not, it's missing
    ({ key }) => !reviewBuilderInfoKeys.includes(key),
  );
  // Check if there's any missing keys
  if (missingKeys.length > 0) {
    // Get the keys and join them with a comma
    const missingKeysStr = missingKeys.map((key) => key.key).join(', ');
    // Throw an error with the missing keys
    throw new Error('Missing change keys: ' + missingKeysStr);
  }

  // Check if there's any changes
  if (!guildId) return null;

  // Create the query object
  const query: ReviewBuilderQuery = {};

  // Loop through the changes
  for (const [changeKey, change] of changes) {
    // Get the builder info
    const builderInfo = reviewBuilderInfo[changeKey];
    // Get the query name
    let queryName = builderInfo.query.name;

    // If the query is a translation, add the translation suffix
    if (builderInfo.query.translation) {
      queryName = queryName + '__' + 'translation//' + changeKey;
    }

    // If the query requires a guild id, add it
    const value = change.current;

    // If the value is null, continue the loop.
    if (value === null) continue;

    // if no object is set yet, create it
    if (!query[queryName]?.name) {
      query[queryName] = {
        name: queryName,
        variablesName: builderInfo.query.variablesName,
        variables: {
          [builderInfo.variable]: value,
        },
      };
    } else {
      // If the object is set, add the variable
      query[queryName].variables[builderInfo.variable] = value;
    }

    // If the query is a translation, add the key
    if (builderInfo.query.translation) {
      // Find the key
      const key = changeKeysValuesArray.find(
        (c) => c.key === changeKey,
      )?.translationKey;
      // If a key is found, add it to the variables
      if (key) query[queryName].variables.key = key;
    }

    // Modifications when booleanNull is true
    if (builderInfo?.booleanNull) {
      // Explicit false, not null, undefined or etc...
      if (value === false) {
        // Set the variable to null
        query[queryName].variables[builderInfo.variable] = null;
      }
      // Same here, but true
      if (value === true) {
        // Delete the variable
        delete query[queryName].variables[builderInfo.variable];
      }
    }

    // Add the guild id if the query requires it
    if (builderInfo.query.requiresGuildId) {
      query[queryName].variables.guildId = guildId;
    }
  }

  // Build the mutation and return it.
  return buildQuery(query);
}

function buildQuery(queries: ReviewBuilderQuery) {
  // Check if there's any queries
  if (Object.keys(queries).length < 1) return null;

  // Build the query string
  let queryString = 'mutation {';

  // Loop through the queries
  for (const key in queries) {
    // Get the query
    const query = queries[key];
    // Get the variables
    const variables = query.variables || {};
    // Get the variables as an array
    const variablesObj = Object.entries(variables);
    // Get the variables as a string
    const variablesString = variablesObj
      // Loop through the variables
      .map(([name, value]) => {
        // If the value is a string, add quotes
        if (typeof value === 'string') return `${name}: "${value}"`;
        // otherwise, just return the value
        return `${name}: ${value}`;
      })
      // Join the variables with a comma
      .join(', ');

    // Get the real name, without the added suffix
    const name = query.name.split('__')[0];

    // Add the query to the query string
    queryString += `\n  ${name}(${query.variablesName}: { ${variablesString} }) { __typename }`;
  }

  // Close the query string
  queryString += '\n}';

  // Return the query string
  return queryString;
}