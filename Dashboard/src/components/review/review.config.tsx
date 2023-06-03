export interface ChangeKey {
  title: string;
  key: string;
  url: (id: string) => string;
}

export interface ChangeKeys {
  [key: string]: ChangeKey;
}

export const changeKeys = {
  moduleLevelLevelUp: {
    title: 'Levels module',
    key: 'module.level.level-up',
    url: (id: string) => `/dashboard/${id}/module/levels#level-up`,
  },
  moduleLevelLevelUpText: {
    title: 'Level up event text',
    key: 'module.level.level-up.text',
    url: (id: string) => `/dashboard/${id}/module/levels#level-up`,
  },
  moduleLevelLevelUpChannel: {
    title: 'Level up event channel',
    key: 'module.level.level-up.channel',
    url: (id: string) => `/dashboard/${id}/module/levels#level-up`,
  },
  moduleLevelNickname: {
    title: 'Nickname module',
    key: 'module.level.nickname',
    url: (id: string) => `/dashboard/${id}/module/levels#nickname`,
  },
  moduleLevelNicknameText: {
    title: 'Nickname module text',
    key: 'module.level.nickname.text',
    url: (id: string) => `/dashboard/${id}/module/levels#nickname`,
  },
};

export const changeKeysArray = Object.values(changeKeys);
