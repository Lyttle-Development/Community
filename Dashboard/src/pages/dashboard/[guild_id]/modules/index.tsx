import { Layout } from '@lyttledev-dashboard/layouts';
import { useEffect, useState } from 'react';
import { Component } from '@lyttledev-dashboard/components';
import { CardModules } from '@lyttledev-dashboard/components/modules';
import { getLevelsConfig } from '@lyttledev-dashboard/pages/dashboard/[guild_id]/module/levels';
import { getBirthdaysConfig } from '@lyttledev-dashboard/pages/dashboard/[guild_id]/module/birthdays';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { gql, useLazyQuery } from '@apollo/client';
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

  const [fetch, { data, refetch }] = useLazyQuery(modulesQuery);

  useEffect(() => {
    if (!authorized) return;
    if (typeof guildId !== 'string') return;
    if (!data?.guild?.guildId && guildId) {
      void fetch({ variables: { id: guildId } });
      return;
    }
    if (guildId === data?.guild?.guildId) return;
    void refetch({ variables: { id: guildId } });
  }, [authorized, guildId]);

  // Update selected guild id from context
  useEffect(() => {
    if (guildId === null) return;
    if (!authorized) return;
    if (!data) return;

    const lvls = data.guild.moduleLevel ?? {};

    // Get modules
    setModules([
      getLevelsConfig({
        guildId,
        enabled: lvls.enabled ?? false,
        nicknameActive: lvls.nicknames ?? false,
        announcementId: lvls.announcementChannelId ?? null,
        leaderboardId: lvls.leaderboardChannelId ?? null,
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
