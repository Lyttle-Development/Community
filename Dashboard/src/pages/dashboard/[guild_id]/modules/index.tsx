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
import { getDynamicVoiceConfig } from '@lyttledev-dashboard/pages/dashboard/[guild_id]/module/dynamic-voice';
import { getVoiceTopicsConfig } from '@lyttledev-dashboard/pages/dashboard/[guild_id]/module/voice-topics';

const modulesQuery = gql`
  query Modules($id: String!) {
    guild(id: $id) {
      guildId
      moduleLevel {
        enabled
        levelingMultiplier
        announcementChannelId
        leaderboardChannelId
        leaderboardLastWeek
        nicknames
        lastLeaderboard
      }
      moduleBirthday {
        enabled
        birthdayChannelId
      }
      moduleVoiceGrowth {
        enabled
        channelId
        manual
      }
      discord {
        guildChannels
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

    const guildChannels = data.guild.discord.guildChannels ?? [];

    const lvls = data.guild.moduleLevel ?? {};
    const bday = data.guild.moduleBirthday ?? {};

    const voiceGrowth = (data.guild.moduleVoiceGrowth ?? [])
      .filter((e: any) => e.enabled)
      .filter((e: any) => !e.manual)
      .map((e: any) => ({
        title:
          guildChannels.find((c: any) => c.id === e.channelId)?.name ??
          e.channelId,
        id: e.channelId,
      }));
    const voiceTopics = (data.guild.moduleVoiceGrowth ?? [])
      .filter((e: any) => e.enabled)
      .filter((e: any) => e.manual)
      .map((e: any) => ({
        title:
          guildChannels.find((c: any) => c.id === e.channelId)?.name ??
          e.channelId,
        id: e.channelId,
      }));

    // Get modules
    setModules([
      getLevelsConfig({
        guildId,
        enabled: lvls.enabled ?? false,
        nicknameActive: lvls.nicknames ?? false,
        announcementId: lvls.announcementChannelId ?? null,
        leaderboardId: lvls.leaderboardChannelId ?? null,
      }),
      getBirthdaysConfig({
        guildId,
        enabled: bday.enabled ?? false,
        announcementChannelId: bday.birthdayChannelId ?? null,
      }),
      getDynamicVoiceConfig(guildId, null, voiceGrowth),
      getVoiceTopicsConfig(guildId, null, voiceTopics),
    ]);
  }, [guildId, data, authorized]);

  // if (!authorized) return null;

  return (
    <Component.Container>
      <Component.Title>{title}</Component.Title>
      <Layout.Transition>
        {!guildId || !authorized ? (
          <Component.ModulesDummy />
        ) : (
          <Component.Modules modules={modules} />
        )}
      </Layout.Transition>
    </Component.Container>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
