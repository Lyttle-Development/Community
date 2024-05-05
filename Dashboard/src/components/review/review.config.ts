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
  server: {
    title: 'Server',
    key: 'server',
    url: (id: string) => `/servers/${id}`,
  },
  modulesLevels: {
    title: 'Levels module',
    key: 'modules.levels',
    url: (id: string) => `/servers/${id}/modules#levels`,
  },
  modulesLevelsWordLevel: {
    title: 'Levels module',
    key: 'modules.levels.unit.level',
    translationKey: 'Activity.levels.unit.level',
    url: (id: string) => `/servers/${id}/modules#module`,
  },
  modulesLevelsWordLevels: {
    title: 'Levels module',
    key: 'modules.levels.unit.levels',
    translationKey: 'Activity.levels.unit.levels',
    url: (id: string) => `/servers/${id}/modules#module`,
  },
  modulesLevelsWordPoint: {
    title: 'Levels module',
    key: 'modules.levels.unit.point',
    translationKey: 'Activity.levels.unit.point',
    url: (id: string) => `/servers/${id}/modules#module`,
  },
  modulesLevelsWordPoints: {
    title: 'Levels module',
    key: 'modules.levels.unit.points',
    translationKey: 'Activity.levels.unit.points',
    url: (id: string) => `/servers/${id}/modules#module`,
  },
  moduleLevelsLevelUp: {
    title: 'Levels module',
    key: 'module.level.level-up',
    url: (id: string) => `/servers/${id}/module/levels#level-up`,
  },
  moduleLevelsLevelUpText: {
    title: 'Level up event text',
    key: 'module.level.level-up.text',
    translationKey: 'Activity.levels.event.level-up',
    url: (id: string) => `/servers/${id}/module/levels#level-up`,
  },
  moduleLevelsNicknameNumbers: {
    title: 'Nickname Numbers',
    key: 'module.level.nickname-numbers',
    translationKey: 'Activity.levels.event.level-up',
    url: (id: string) => `/servers/${id}/module/levels#level-up`,
  },
  moduleLevelsNicknameNumbersLevels: {
    title: 'Levels Numbers Style',
    key: 'module.level.nickname-numbers.levels',
    translationKey: 'Activity.levels.txt.nickname-numbers.levels',
    url: (id: string) => `/servers/${id}/module/levels#level-up`,
  },
  moduleLevelsNicknameNumbersRecentLevels: {
    title: 'Recent Levels Numbers Style',
    key: 'module.level.nickname-numbers.recent-levels',
    translationKey: 'Activity.levels.txt.nickname-numbers.recent-levels',
    url: (id: string) => `/servers/${id}/module/levels#level-up`,
  },
  moduleLevelsNicknameNumbersPoints: {
    title: 'Points Numbers Style',
    key: 'module.level.nickname-numbers.points',
    translationKey: 'Activity.levels.txt.nickname-numbers.points',
    url: (id: string) => `/servers/${id}/module/levels#level-up`,
  },
  moduleLevelsNicknameNumbersRecentPoints: {
    title: 'Recent Points Numbers Style',
    key: 'module.level.nickname-numbers.recent-points',
    translationKey: 'Activity.levels.txt.nickname-numbers.recent-points',
    url: (id: string) => `/servers/${id}/module/levels#level-up`,
  },
  moduleLevelsAnnouncement: {
    title: 'Announcement channel',
    key: 'module.levels.announcement',
    url: (id: string) => `/servers/${id}/module/levels#level-up`,
  },
  moduleLevelsAnnouncementChannel: {
    title: 'Announcement channel',
    key: 'module.levels.announcement.channel',
    url: (id: string) => `/servers/${id}/module/levels#level-up`,
  },
  moduleLevelsLeaderboard: {
    title: 'Leaderboard module',
    key: 'module.levels.leaderboard',
    url: (id: string) => `/servers/${id}/module/levels#leaderboard`,
  },
  moduleLevelsNickname: {
    title: 'Nickname module',
    key: 'module.level.nickname',
    url: (id: string) => `/servers/${id}/module/levels#nickname`,
  },
  moduleLevelsNicknameText: {
    title: 'Nickname module text',
    key: 'module.level.nickname.text',
    translationKey: 'Activity.levels.txt.nickname',
    url: (id: string) => `/servers/${id}/module/levels#nickname`,
  },
  moduleLevelsCommandFailed: {
    title: 'Command Failed',
    key: 'module.level.command.failed',
    translationKey: 'Activity.levels.commands.get-levels.failed',
    url: (id: string) => `/servers/${id}/module/levels#command`,
  },
  moduleLevelsCommandOther: {
    title: 'Command Other',
    key: 'module.level.command.other',
    translationKey: 'Activity.levels.commands.get-levels.other',
    url: (id: string) => `/servers/${id}/module/levels#command`,
  },
  moduleLevelsCommandOthers: {
    title: 'Command Others',
    key: 'module.level.command.others',
    translationKey: 'Activity.levels.commands.get-levels.others',
    url: (id: string) => `/servers/${id}/module/levels#command`,
  },
  moduleLevelsCommandOthersAhead: {
    title: 'Command Others Ahead',
    key: 'module.level.command.others.ahead',
    translationKey: 'Activity.levels.commands.get-levels.others',
    url: (id: string) => `/servers/${id}/module/levels#command`,
  },
  moduleLevelsCommandOthersBehind: {
    title: 'Command Others Behind',
    key: 'module.level.command.others.behind',
    translationKey: 'Activity.levels.commands.get-levels.others',
    url: (id: string) => `/servers/${id}/module/levels#command`,
  },
  moduleLevelsCommandYourself: {
    title: 'Command Yourself',
    key: 'module.level.command.yourself',
    translationKey: 'Activity.levels.commands.get-levels.yourself',
    url: (id: string) => `/servers/${id}/module/levels#command`,
  },
  moduleBirthday: {
    title: 'Birthday module',
    key: 'module.birthday',
    url: (id: string) => `/servers/${id}/module/birthdays`,
  },
  moduleBirthdayChannel: {
    title: 'Birthday module channel',
    key: 'module.birthday.channel',
    url: (id: string) => `/servers/${id}/module/birthdays#channel`,
  },
  moduleBirthdayText: {
    title: 'Birthday module text',
    key: 'module.birthday.text',
    translationKey: 'Activity.birth-day.txt.announcement',
    url: (id: string) => `/servers/${id}/module/birthdays#text`,
  },
  moduleVoiceTopicsChannels: {
    title: 'Voice Topics module channels',
    key: 'module.voice-topics.channels',
    url: (id: string) => `/servers/${id}/module/voice-topics#channels`,
  },
  moduleDynamicVoiceChannels: {
    title: 'Dynamic Voice module channels',
    key: 'module.dynamic-voice.channels',
    url: (id: string) => `/servers/${id}/module/dynamic-voice#channels`,
  },
} as const;

export const changeKeysValuesArray = Object.values(changeKeys);
export const changeKeysKeysArray = Object.keys(changeKeys);
