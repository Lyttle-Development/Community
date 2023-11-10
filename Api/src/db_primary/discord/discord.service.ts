import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Discord } from './entities/discord.entity';
import { GuildService } from '../guild/guild.service';
import { Guild } from '../guild/entities/guild.entity';
import {
  APIChannel,
  APIGuild,
  RESTAPIPartialCurrentUserGuild,
  RESTGetAPICurrentUserGuildsResult,
  RESTGetAPIGuildChannelsResult,
  RESTGetAPIUserResult,
} from 'discord-api-types/v10';
import { DashboardServer, DashboardServers, getIcon } from './utils';
import { GuildStatResolvedService } from '../guild-stat-resolved/guild-stat-resolved.service';
import { GuildModuleLevelService } from '../guild-module-level/guild-module-level.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

// Discord API URL, this to follow the api types.
export const DiscordApiBaseUrl = 'https://discord.com/api/v10' as const;

// in milliseconds (30 seconds)
const cacheTime = 30 * 1000;

@Injectable()
export class DiscordService {
  constructor(
    @Inject(forwardRef(() => GuildService))
    private guildService: GuildService,
    @Inject(forwardRef(() => GuildStatResolvedService))
    private guildStatResolvedService: GuildStatResolvedService,
    @Inject(forwardRef(() => GuildModuleLevelService))
    private guildModuleLevelService: GuildModuleLevelService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  create(guildId: string | null = null): Discord {
    return { guildId } as Discord;
  }

  async getUser(token: string): Promise<RESTGetAPIUserResult> {
    if (!token) return null;

    const cacheKey = `discord:user:${token}:id`;
    const cachedUser = await this.cacheManager.get(cacheKey);
    if (cachedUser) return cachedUser as RESTGetAPIUserResult;

    const result = await fetch(`${DiscordApiBaseUrl}/users/@me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const user = (await result.json()) as RESTGetAPIUserResult;
    if (result.status === 200) {
      await this.cacheManager.set(cacheKey, user, cacheTime);
    }

    return user;
  }

  async getGuild(guildId: string): Promise<APIGuild> {
    if (!guildId) return null;

    const cacheKey = `discord:guild:${guildId}`;
    const cachedGuild = await this.cacheManager.get(cacheKey);
    if (cachedGuild) return cachedGuild as APIGuild;

    const botToken = process.env.BOT_TOKEN;
    const result = await fetch(
      `${DiscordApiBaseUrl}/guilds/${guildId}?with_counts=true`,
      {
        method: 'GET',
        headers: {
          authorization: `Bot ${botToken}`,
        },
      },
    );

    const guild = ((await result.json()) ?? {}) as APIGuild;
    if (result.status === 200) {
      await this.cacheManager.set(cacheKey, guild, cacheTime);
    }

    return guild;
  }

  async getGuildChannels(
    guildId: string,
  ): Promise<RESTGetAPIGuildChannelsResult> {
    if (!guildId) return null;

    const cacheKey = `discord:guild:${guildId}:channels`;
    const cachedGuild = await this.cacheManager.get(cacheKey);
    if (cachedGuild) return cachedGuild as RESTGetAPIGuildChannelsResult;

    const botToken = process.env.BOT_TOKEN;
    const result = await fetch(
      `${DiscordApiBaseUrl}/guilds/${guildId}/channels`,
      {
        method: 'GET',
        headers: {
          authorization: `Bot ${botToken}`,
        },
      },
    );

    const guildChannels = ((await result.json()) ??
      []) as RESTGetAPIGuildChannelsResult;
    if (!guildChannels || !Array.isArray(guildChannels)) return [];
    if (result.status === 200) {
      await this.cacheManager.set(cacheKey, guildChannels, cacheTime);
    }

    return guildChannels;
  }

  async getGuildCategoryChannels(
    guildId: string,
  ): Promise<RESTGetAPIGuildChannelsResult> {
    if (!guildId) return null;

    const guildChannels = await this.getGuildChannels(guildId);
    if (!guildChannels || !Array.isArray(guildChannels)) return null;

    return guildChannels.filter(
      (channel: APIChannel) => channel.type === 4,
    ) as RESTGetAPIGuildChannelsResult;
  }

  async getGuildTextChannels(
    guildId: string,
  ): Promise<RESTGetAPIGuildChannelsResult> {
    if (!guildId) return null;

    const guildChannels = await this.getGuildChannels(guildId);
    if (!guildChannels || !Array.isArray(guildChannels)) return null;

    return guildChannels.filter(
      (channel: APIChannel) => channel.type === 0,
    ) as RESTGetAPIGuildChannelsResult;
  }

  async getGuildVoiceChannels(
    guildId: string,
  ): Promise<RESTGetAPIGuildChannelsResult> {
    if (!guildId) return null;

    const guildChannels = await this.getGuildChannels(guildId);
    if (!guildChannels || !Array.isArray(guildChannels)) return null;

    return guildChannels.filter(
      (channel: APIChannel) => channel.type === 2,
    ) as RESTGetAPIGuildChannelsResult;
  }

  async getUserGuilds(
    token: string,
  ): Promise<RESTGetAPICurrentUserGuildsResult> {
    if (!token) return null;

    const cacheKey = `discord:user:${token}:guilds`;
    const cachedGuilds = await this.cacheManager.get(cacheKey);
    if (cachedGuilds) return cachedGuilds as RESTGetAPICurrentUserGuildsResult;

    const result = await fetch(
      `${DiscordApiBaseUrl}/users/@me/guilds?with_counts=true`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    const guilds = ((await result.json()) ??
      []) as RESTGetAPICurrentUserGuildsResult;
    if (result.status === 200) {
      await this.cacheManager.set(cacheKey, guilds, cacheTime);
    }
    return guilds;
  }

  async getUserPermittedGuildsSeparate(token: string): Promise<{
    ownedGuilds: RESTGetAPICurrentUserGuildsResult;
    moderateGuilds: RESTGetAPICurrentUserGuildsResult;
  }> {
    if (!token) return null;

    const userGuilds: RESTGetAPICurrentUserGuildsResult =
      await this.getUserGuilds(token);

    const ownedGuilds: RESTGetAPICurrentUserGuildsResult = userGuilds?.filter(
      (guild: RESTAPIPartialCurrentUserGuild) => guild.owner === true,
    );

    const moderateGuilds: RESTGetAPICurrentUserGuildsResult =
      userGuilds?.filter(
        // Not owner and has admin perms
        // NOTE about ANY: Sadly enough discord doesn't have a permission type for this
        (guild: any) =>
          guild.owner === false && (guild.permissions & 0x8) === 0x8,
      );

    return { ownedGuilds, moderateGuilds };
  }

  async getUserPermittedGuilds(
    token: string,
  ): Promise<RESTGetAPICurrentUserGuildsResult> {
    if (!token) return null;

    const { ownedGuilds, moderateGuilds } =
      await this.getUserPermittedGuildsSeparate(token);

    return [
      ...ownedGuilds,
      ...moderateGuilds,
    ] as RESTGetAPICurrentUserGuildsResult;
  }

  async getDashboardGuilds(token: string): Promise<DashboardServers> {
    if (!token) return null;

    const user = await this.getUser(token);

    // Discord guilds
    const {
      ownedGuilds: discordOwnedGuilds,
      moderateGuilds: discordModerateGuilds,
    } = await this.getUserPermittedGuildsSeparate(token);
    const discordUserPermittedGuilds: RESTAPIPartialCurrentUserGuild[] = [
      ...discordOwnedGuilds,
      ...discordModerateGuilds,
    ];
    const userPermittedGuildsIds: string[] = discordUserPermittedGuilds.map(
      (guild: RESTAPIPartialCurrentUserGuild) => guild.id,
    );

    // Api guilds
    const apiGuilds: Guild[] =
      await this.guildService.findAllBuildsByStaffMemberId(
        userPermittedGuildsIds,
        user.id,
      );

    // Setup servers
    const setupServers: DashboardServers = [];
    for (const guild of apiGuilds) {
      setupServers.push({
        id: guild.guildId,
        name: null,
        icon: null,
        setup: true,
        active: guild.enabled,
        members: 0,
        staffMembers: 0,
        modulesEnabled: 0,
      });
    }

    // Dashboard servers
    const dashboardServers: DashboardServers = [];
    for (const server of setupServers) {
      const serv: RESTAPIPartialCurrentUserGuild = discordOwnedGuilds.find(
        (guild: RESTAPIPartialCurrentUserGuild) => guild.id === server.id,
      );
      if (serv) {
        dashboardServers.push(server);
      }
    }

    for (const server of setupServers) {
      const discordModerateGuild: RESTAPIPartialCurrentUserGuild =
        discordModerateGuilds.find(
          (guild: RESTAPIPartialCurrentUserGuild) => guild.id === server.id,
        );
      if (discordModerateGuild) {
        dashboardServers.push(server);
      }
    }

    // GuildIds dashboard servers
    const guildIds: string[] = dashboardServers.map(
      (guild: DashboardServer) => guild.id,
    );

    // Build dashboard servers
    for (const guild of discordUserPermittedGuilds) {
      // Get guild index
      const serverIndex: number = guildIds.findIndex(
        (srv: string) => guild.id === srv,
      );

      if (serverIndex > -1) {
        // Get server
        const server: DashboardServer = dashboardServers[serverIndex];
        if (!server) continue;

        // Define modules enabled
        let modulesEnabled = 0;

        // Get guild modules and count enabled
        const guildModuleLevels = await this.guildModuleLevelService.findOne(
          guild.id,
        );
        if (guildModuleLevels?.enabled) ++modulesEnabled;
        // const guildModuleBirthday = await this.guildModuleBirthdayService.findOneByGuildId(guild.id);
        // if (guildModuleBirthday?.enabled) modulesEnabled++;

        // Get staff members
        const staffMembers: number =
          await this.guildStatResolvedService.getStaffMembers(guild.id);

        // Update server
        server.name = guild.name;
        server.icon = getIcon(guild);
        server.members = guild.approximate_member_count;
        server.staffMembers = staffMembers ?? 0;
        server.modulesEnabled = modulesEnabled;
        dashboardServers[serverIndex] = server;

        // Continue loop
        continue;
      }

      // Add new server
      dashboardServers.push({
        id: guild.id,
        name: guild.name,
        icon: getIcon(guild),
        setup: false,
        active: null,
        members: guild.approximate_member_count,
        staffMembers: 0,
        modulesEnabled: 0,
      });
    }

    // Return dashboard servers
    return dashboardServers;
  }
}
