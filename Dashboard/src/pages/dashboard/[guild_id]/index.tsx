import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useEffect } from 'react';
import { getMessage } from '@lyttledev-dashboard/utils';
import { StatsCardColors } from '@lyttledev-dashboard/components/stats-card';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { gql, useLazyQuery } from '@apollo/client';
import { getModulesEnabled } from '@lyttledev-dashboard/utils/modules-enabled';
import { Constants } from '@lyttledev-dashboard/constants';

const GuildQuery = gql`
  query GuildQuery($guildId: String!) {
    guild(id: $guildId) {
      guildId
      enabled
      moduleLevel {
        enabled
      }
      moduleVoiceGrowth {
        enabled
      }
      stats {
        staffMembers
        bots
        eventsTriggered
        activity
      }
      discord {
        guild
      }
    }
  }
`;

const OpenAiQuery = gql`
  query OpenAiQuery($guildId: String!) {
    guild(id: $guildId) {
      guildId
      openAi {
        recommendation
      }
    }
  }
`;

function Page() {
  const guildId = useGuild();
  const title = usePage(pagesPrefix + 'overview.title');

  const pfx = pagesPrefix + 'overview.recommendation.';
  const msgRecommendation = getMessage(pfx + 'title');
  const msgMembers = getMessage(pfx + 'members');
  const msgStaff = getMessage(pfx + 'staff');
  const msgBots = getMessage(pfx + 'bots');
  const msgModules = getMessage(pfx + 'modules');
  const msgEvents = getMessage(pfx + 'events');
  const msgActivity = getMessage(pfx + 'activity');

  // useEffect(() => {
  //   setTimeout(() => {
  //     setRecommendation(
  //       'After some deep analysis, we recommend you to, handle this and handle that. That way you can imrove that while tweaking this. While tweaking that you could do that meaning it could fix what and when it does it can whathever you want. So, do it. Do it now. Whenever you can, want or will do. While it still can. Doing it while you can is the best way to do it.',
  //     );
  //   }, 5000);
  // }, []);

  const [fetch, { data }] = useLazyQuery(GuildQuery);
  const [fetchOpenAi, { data: dataOpenAi }] = useLazyQuery(OpenAiQuery);

  useEffect(() => {
    if (!guildId) return;
    if (data?.guild?.guildId === guildId) return;

    void fetch({ variables: { guildId } });
    void fetchOpenAi({ variables: { guildId } });
  }, [guildId]);

  const members = data?.guild?.discord?.guild?.approximate_member_count || 0;

  const modulesEnabled = getModulesEnabled(data?.guild);
  const modulesPercent = modulesEnabled
    ? Math.round((modulesEnabled / Constants.totalModules) * 100)
    : 0;

  const staff = data?.guild?.stats?.staffMembers || 0;
  let staffPercent = Math.round((staff / members) * 100 * 100) / 100;
  if (staffPercent > 10) {
    staffPercent = Math.round(staffPercent);
  }

  const bots = data?.guild?.stats?.bots || 0;
  let botsPercent = Math.round((bots / members) * 100 * 100) / 100;
  if (botsPercent > 10) {
    botsPercent = Math.round(botsPercent);
  }

  const totalMembers = members - (staff + bots);
  let totalMembersPercent =
    Math.round((totalMembers / members) * 100 * 100) / 100;
  if (totalMembersPercent >= 10) {
    totalMembersPercent = Math.round(totalMembersPercent);
  }

  const activity = data?.guild?.stats?.activity || 0;
  const expectedUserActivity = members * Constants.expectedUserActivity;
  let activityPercent =
    Math.round((activity / expectedUserActivity) * 100 * 100) / 100;
  if (activityPercent > 10) {
    activityPercent = Math.round(activityPercent);
  }

  const events = data?.guild?.stats?.eventsTriggered || 0;
  let eventsPercent = Math.round((events / activity) * 100 * 100) / 100;
  if (eventsPercent > 10) {
    eventsPercent = Math.round(eventsPercent);
  }

  const membersChange = staff + bots;
  const staffChange = totalMembers + bots;
  const botsChange = totalMembers + staff;

  const modulesChange = modulesEnabled - Constants.totalModules;
  const eventsChange = activity - events;
  const activityChange = activity - expectedUserActivity;

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        <Component.TipCard
          title={msgRecommendation}
          description={dataOpenAi?.guild?.openAi?.recommendation ?? null}
          tipKey={'overview.recommendation'}
        />
        <Component.Stats
          stats={[
            {
              title: msgMembers,
              value: totalMembers,
              change: membersChange || 0,
              changeNote: ' other',
              total: totalMembersPercent || 0,
            },
            {
              title: msgStaff,
              value: staff,
              change: staffChange || 0,
              total: staffPercent || 0,
              changeNote: ' non staff',
              color: StatsCardColors.Orange,
            },
            {
              title: msgBots,
              value: bots,
              change: botsChange || 0,
              total: botsPercent || 0,
              changeNote: ' non bot',
              color: StatsCardColors.Yellow,
            },
            {
              title: msgModules,
              value: modulesEnabled,
              change: modulesChange || 0,
              changeNote: ' missing',
              total: modulesPercent || 0,
            },
            {
              title: msgEvents,
              value: events,
              change: eventsChange || 0,
              changeNote: ' other',
              total: eventsPercent || 0,
              color: StatsCardColors.Orange,
            },
            {
              title: msgActivity,
              value: activity,
              change: activityChange || 0,
              changeNote: ' usually',
              total: activityPercent || 0,
              color: StatsCardColors.Yellow,
            },
          ]}
        ></Component.Stats>
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
