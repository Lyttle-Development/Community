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
  };
}

export interface ReviewBuilderQuery {
  [key: string]: {
    name: string;
    variablesName: string;
    variables: {
      [key: string]: string | boolean | number;
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
  },
  [changeKeys.moduleLevelsLeaderboard.key]: {
    query: reviewBuilderMutations.updateGuildModuleLevel,
    variable: 'leaderboardChannelId',
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
  const missingKeys = changeKeysValuesArray.filter(
    ({ key }) => !reviewBuilderInfoKeys.includes(key),
  );
  if (missingKeys.length > 0) {
    const missingKeysStr = missingKeys.map((key) => key.key).join(', ');
    throw new Error('Missing change keys: ' + missingKeysStr);
  }

  if (!guildId) return null;

  const query: ReviewBuilderQuery = {};

  for (const [name, change] of changes) {
    const builderInfo = reviewBuilderInfo[name];
    let queryName = builderInfo.query.name;
    if (builderInfo.query.translation) {
      queryName = queryName + '__' + 'translation//' + name;
    }
    const value = change.current;
    if (value === null) continue;
    if (!query[queryName]?.name) {
      query[queryName] = {
        name: queryName,
        variablesName: builderInfo.query.variablesName,
        variables: {
          [builderInfo.variable]: value,
        },
      };
    } else {
      query[queryName].variables[builderInfo.variable] = value;
    }

    if (builderInfo.query.translation) {
      const key = changeKeysValuesArray.find(
        (c) => c.key === name,
      )?.translationKey;
      if (key) query[queryName].variables.key = key;
    }

    if (builderInfo.query.requiresGuildId) {
      query[queryName].variables.guildId = guildId;
    }
  }

  return buildQuery(query);
}

function buildQuery(query: ReviewBuilderQuery) {
  if (Object.keys(query).length < 1) return null;
  let queryString = 'mutation {';

  for (const key in query) {
    const q = query[key];
    const variables = q.variables || {};
    const variablesObj = Object.entries(variables);
    const variablesString = variablesObj
      .map((v) => {
        const value = v[1];
        if (typeof value === 'string') return `${v[0]}: "${value}"`;
        return `${v[0]}: ${value}`;
      })
      .join(', ');
    const name = q.name.split('__')[0];
    queryString += `\n  ${name}(${q.variablesName}: { ${variablesString} }) { __typename }`;
  }

  queryString += '\n}';

  return queryString;
}
