import { loginReturnUrl } from '@lyttledev-dashboard/constants/api.constant';

export const appName = 'Community by Lyttle Development';
export const mobileWidth = 1000;
export const totalModules = 2;
export const expectedUserActivity = 50;

const inviteUrl = 'https://discord.com/oauth2/authorize';
const clientId = '1091770488361058435';
const permissions = '8';
const scope = 'bot%20identify%20applications.commands';
const redirectUri = loginReturnUrl;
export const getInviteBotUrl = (guildId: string) =>
  `${inviteUrl}?client_id=${clientId}&permissions=${permissions}&scope=${scope}&redirect_uri=${redirectUri}&guild_id=${guildId}&response_type=code&disable_guild_select=true`;
export const inviteBotUrl = `${inviteUrl}?client_id=${clientId}&permissions=${permissions}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`;
