export interface ChangeKey {
  title: string;
  key: string;
  translationKey?: string;
  url: (id: string) => string;
}

export interface ChangeKeys {
  [key: string]: ChangeKey;
}

export const changeKeys: ChangeKeys = {
  modulesLevels: {
    title: 'Levels module',
    key: 'modules.levels',
    url: (id: string) => `/dashboard/${id}/modules#levels`,
  },
  moduleLevelsLevelUp: {
    title: 'Levels module',
    key: 'module.level.level-up',
    url: (id: string) => `/dashboard/${id}/module/levels#level-up`,
  },
  moduleLevelsLevelUpText: {
    title: 'Level up event text',
    key: 'module.level.level-up.text',
    translationKey: 'Activity.levels.event.level-up',
    url: (id: string) => `/dashboard/${id}/module/levels#level-up`,
  },
  moduleLevelsAnnouncement: {
    title: 'Level up announcement channel',
    key: 'modules.levels.announcement',
    url: (id: string) => `/dashboard/${id}/modules/levels#level-up`,
  },
  moduleLevelsLeaderboard: {
    title: 'Leaderboard module',
    key: 'modules.levels.leaderboard',
    url: (id: string) => `/dashboard/${id}/modules/levels#leaderboard`,
  },
  moduleLevelsNickname: {
    title: 'Nickname module',
    key: 'module.level.nickname',
    url: (id: string) => `/dashboard/${id}/module/levels#nickname`,
  },
  moduleLevelsNicknameText: {
    title: 'Nickname module text',
    key: 'module.level.nickname.text',
    translationKey: 'Activity.levels.txt.nickname',
    url: (id: string) => `/dashboard/${id}/module/levels#nickname`,
  },
  moduleBirthday: {
    title: 'Birthday module',
    key: 'module.birthday',
    url: (id: string) => `/dashboard/${id}/module/birthdays`,
  },
  moduleBirthdayChannel: {
    title: 'Birthday module channel',
    key: 'module.birthday.channel',
    url: (id: string) => `/dashboard/${id}/module/birthdays#channel`,
  },
  moduleBirthdayText: {
    title: 'Birthday module text',
    key: 'module.birthday.text',
    url: (id: string) => `/dashboard/${id}/module/birthdays#text`,
  },
} as const;

export const changeKeysValuesArray = Object.values(changeKeys);
export const changeKeysKeysArray = Object.keys(changeKeys);
