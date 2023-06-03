export interface ChangeKey {
  title: string;
  key: string;
}

export interface ChangeKeys {
  [key: string]: ChangeKey;
}

export const changeKeys = {
  moduleLevelLevelUp: {
    title: 'Levels module',
    key: 'module.level.level-up',
  },
  moduleLevelLevelUpText: {
    title: 'Level up event text',
    key: 'module.level.level-up.text',
  },
  moduleLevelLevelUpChannel: {
    title: 'Level up event channel',
    key: 'module.level.level-up.channel',
  },
  moduleLevelNickname: {
    title: 'Nickname module',
    key: 'module.level.nickname',
  },
  moduleLevelNicknameText: {
    title: 'Nickname module text',
    key: 'module.level.nickname.text',
  },
};

export const changeKeysArray = Object.values(changeKeys);
