export interface DashboardServer {
  id: string;
  name: string | null;
  icon: string | null;
  setup: boolean;
  active: boolean | null;
  members: number;
  staffMembers: number;
  modulesEnabled: number;
}

export type DashboardServers = DashboardServer[];

export const getIcon = (guild: { id: string; icon: string | null }) =>
  guild.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
    : '';
