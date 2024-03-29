import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useEffect, useState } from 'react';
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
  const [disableTip, setDisableTip] = useState(false);
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

  const [fetch, { data }] = useLazyQuery(GuildQuery);
  const [fetchOpenAi, { data: dataOpenAi }] = useLazyQuery(OpenAiQuery, {
    onError: () => setDisableTip(true),
  });

  useEffect(() => {
    if (!guildId) return;
    if (data?.guild?.guildId === guildId) return;

    void fetch({ variables: { guildId } });
    void fetchOpenAi({ variables: { guildId } });
  }, [guildId]);

  let members = data?.guild?.discord?.guild?.approximate_member_count || 0;

  const modulesEnabled = getModulesEnabled(data?.guild);
  const modulesPercent = modulesEnabled
    ? Math.round((modulesEnabled / Constants.totalModules) * 100)
    : 0;

  const staff = data?.guild?.stats?.staffMembers || 0;
  const bots = data?.guild?.stats?.bots || 0;

  if (members < staff + bots) members = staff + bots;

  let staffPercent = Math.round((staff / members) * 100 * 100) / 100;
  if (staffPercent > 10) {
    staffPercent = Math.round(staffPercent);
  }

  let botsPercent = Math.round((bots / members) * 100 * 100) / 100;
  if (botsPercent > 10) {
    botsPercent = Math.round(botsPercent);
  }

  let totalMembers = members - (staff + bots);
  if (totalMembers < 0) totalMembers = 0;

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
        {disableTip ? (
          <Component.TipCard
            title={msgRecommendation}
            description={'Unable to fetch recommendation from OpenAI...'}
            tipKey={'overview.recommendation'}
          />
        ) : (
          <Component.TipCard
            title={msgRecommendation}
            description={dataOpenAi?.guild?.openAi?.recommendation ?? null}
            tipKey={'overview.recommendation'}
          />
        )}
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
