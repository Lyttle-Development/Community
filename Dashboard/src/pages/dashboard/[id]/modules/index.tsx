import { Layout } from '@lyttledev-dashboard/layouts';
import { useEffect, useState } from 'react';
import { Component } from '@lyttledev-dashboard/components';
import { CardModules } from '@lyttledev-dashboard/components/modules';
import { getLevelsConfig } from '@lyttledev-dashboard/pages/dashboard/[id]/module/levels';
import { getBirthdaysConfig } from '@lyttledev-dashboard/pages/dashboard/[id]/module/birthdays';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { gql, useQuery } from '@apollo/client';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';

const modulesQuery = gql`
  query Modules($id: String!) {
    guild(id: $id) {
      guildId
      moduleLevel {
        guildId
        enabled
        levelingMultiplier
        announcementChannelId
        leaderboardChannelId
        leaderboardLastWeek
        nicknames
        lastLeaderboard
      }
    }
  }
`;

function Page() {
  const authorized = useAuth();
  const guildId = useGuild();
  const title = usePage(pagesPrefix + 'modules.title');
  const [modules, setModules] = useState<CardModules>([]);

  const { data, refetch } = useQuery(modulesQuery, {
    variables: { id: guildId },
  });

  useEffect(() => {
    if (!authorized) return;
    void refetch();
  }, [authorized]);

  // Update selected guild id from context
  useEffect(() => {
    if (guildId === null) return;
    if (!authorized) return;
    if (!data) return;

    console.log(data);
    const lvls = data.guild.moduleLevel ?? {};

    // Get modules
    setModules([
      getLevelsConfig({
        guildId,
        enabled: lvls.enabled ?? false,
        levelsId: lvls.guildId ?? null,
        nicknameId: lvls.guildId ?? null,
        nicknameActive: lvls.nicknames ?? false,
        announcementId: lvls.announcementChannelId ?? null,
        announcementActive: typeof lvls.announcementChannelId === 'string',
        leaderboardId: lvls.leaderboardChannelId ?? null,
        leaderboardActive: typeof lvls.leaderboardChannelId === 'string',
      }),
      getBirthdaysConfig(guildId),
      // getDynamicVoiceConfig(guildId),
      // getVoiceTopicsConfig(guildId),
    ]);
  }, [guildId, data, authorized]);

  if (!authorized) return null;

  return (
    <Component.Container>
      <Component.Title>{title}</Component.Title>
      {guildId !== null && <Component.Modules modules={modules} />}
    </Component.Container>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
