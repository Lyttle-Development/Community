import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';
import { useEffect, useState } from 'react';
import { Servers } from '@lyttledev-dashboard/components/server-card';
import { useUserGuilds } from '@lyttledev-dashboard/hooks/useUserGuilds';
import { getModulesEnabled } from '@lyttledev-dashboard/utils/modules-enabled';

function Page() {
  const authorized = useAuth();
  const title = usePage(pagesPrefix + 'dashboard.title');
  const { data, guilds, ownedGuilds, moderateGuilds } = useUserGuilds();
  const [servers, setServers] = useState<Servers>([]);

  useEffect(() => {
    if (!data || !data.guilds) return;
    const setupServers: Servers = [];
    const getIcon = (guild: { id: string; icon: string }) =>
      `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`;

    for (const guild of data.guilds) {
      setupServers.push({
        id: guild.guildId,
        name: null,
        icon: null,
        setup: true,
        active: guild.enabled,
        members: 0,
        modulesEnabled: 0,
      });
    }

    const newServers: Servers = [];
    for (const server of setupServers) {
      const serv = ownedGuilds.find((guild: any) => guild.id === server.id);
      if (serv) {
        newServers.push(server);
      }
    }

    for (const server of setupServers) {
      const serv = moderateGuilds.find((guild: any) => guild.id === server.id);
      if (serv) {
        newServers.push(server);
      }
    }
    const guildIds = newServers.map((guild: any) => guild.id);

    for (const guild of guilds) {
      const serverIndex = guildIds.findIndex((srv: string) => guild.id === srv);

      if (serverIndex > -1) {
        const server = newServers[serverIndex];
        if (!server) continue;
        server.name = guild.name;
        server.icon = getIcon(guild);
        server.members = guild.approximate_member_count;
        server.modulesEnabled = getModulesEnabled(data.guilds[serverIndex]);
        newServers[serverIndex] = server;
        continue;
      }

      newServers.push({
        id: guild.id,
        name: guild.name,
        icon: getIcon(guild),
        setup: false,
        active: null,
        members: guild.approximate_member_count,
        modulesEnabled: 0,
      });
    }
    setServers(newServers);
  }, [guilds]);

  if (!authorized) return null;

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        <Component.ServerCardGrid servers={servers} />
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
