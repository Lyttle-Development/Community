import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useEffect, useState } from 'react';
import { getMessage } from '@lyttledev-dashboard/utils';
import { StatsCardColors } from '@lyttledev-dashboard/components/stats-card';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { gql, useLazyQuery } from '@apollo/client';
import { useUserGuilds } from '@lyttledev-dashboard/hooks/useUserGuilds';
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
    }
  }
`;

function Page() {
  const guildId = useGuild();
  const title = usePage(pagesPrefix + 'overview.title');
  const { guilds } = useUserGuilds();
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const pfx = pagesPrefix + 'overview.recommendation.';
  const msgRecommendation = getMessage(pfx + 'title');
  const msgMembers = getMessage(pfx + 'members');
  // const msgStaff = getMessage(pfx + 'staff');
  // const msgBots = getMessage(pfx + 'bots');
  const msgModules = getMessage(pfx + 'modules');
  // const msgEvents = getMessage(pfx + 'events');
  // const msgActivity = getMessage(pfx + 'activity');

  useEffect(() => {
    setTimeout(() => {
      setRecommendation(
        'After some deep analysis, we recommend you to, handle this and handle that. That way you can imrove that while tweaking this. While tweaking that you could do that meaning it could fix what and when it does it can whathever you want. So, do it. Do it now. Whenever you can, want or will do. While it still can. Doing it while you can is the best way to do it.',
      );
    }, 5000);
  }, []);

  const [fetch, { data }] = useLazyQuery(GuildQuery);

  useEffect(() => {
    if (!guildId) return;
    if (data?.guild?.guildId === guildId) return;

    void fetch({ variables: { guildId } });
  }, [guildId]);

  const members =
    guilds?.find((m: any) => m.id === guildId)?.approximate_member_count ?? 0;
  const totalMembers = guilds?.reduce(
    (acc: number, m: any) => acc + m?.approximate_member_count ?? acc,
    0,
  );
  const membersPercent = totalMembers
    ? Math.round((members / totalMembers) * 100)
    : 0;

  const modulesEnabled = getModulesEnabled(data?.guild);
  const modulesPercent = modulesEnabled
    ? Math.round((modulesEnabled / Constants.totalModules) * 100)
    : 0;

  return (
    <>
      <Component.Title>{title}</Component.Title>
      <Component.Container>
        <Component.TipCard
          title={msgRecommendation}
          description={recommendation}
          tipKey={'overview.recommendation'}
        />
        <Component.Stats
          stats={[
            {
              title: msgMembers,
              value: members,
              change: 0,
              total: membersPercent,
            },
            // {
            //   title: msgStaff,
            //   value: 100,
            //   change: 0,
            //   total: 100,
            //   color: StatsCardColors.Orange,
            // },
            // {
            //   title: msgBots,
            //   value: 100,
            //   change: 0,
            //   total: 100,
            //   color: StatsCardColors.Yellow,
            // },
            {
              title: msgModules,
              value: modulesEnabled,
              change: 0,
              total: modulesPercent,
              color: StatsCardColors.Yellow,
            },
            // {
            //   title: msgEvents,
            //   value: 100,
            //   change: 0,
            //   total: 100,
            //   color: StatsCardColors.Orange,
            // },
            // {
            //   title: msgActivity,
            //   value: 100,
            //   change: 0,
            //   total: 100,
            //   color: StatsCardColors.Yellow,
            // },
          ]}
        ></Component.Stats>
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
