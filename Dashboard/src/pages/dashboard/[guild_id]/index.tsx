import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useEffect, useState } from 'react';
import { getMessage } from '@lyttledev-dashboard/utils';
import { StatsCardColors } from '@lyttledev-dashboard/components/stats-card';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';

function Page() {
  useGuild();
  const title = usePage(pagesPrefix + 'overview.title');
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const msgRecommendation = getMessage(
    pagesPrefix + 'overview.recommendation.title',
  );

  useEffect(() => {
    setTimeout(() => {
      setRecommendation(
        'After some deep analysis, we recommend you to, handle this and handle that. That way you can imrove that while tweaking this. While tweaking that you could do that meaning it could fix what and when it does it can whathever you want. So, do it. Do it now. Whenever you can, want or will do. While it still can. Doing it while you can is the best way to do it.',
      );
    }, 5000);
  }, []);

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
              title: 'Total',
              value: 100,
              change: 10,
              total: 100,
            },
            {
              title: 'Total',
              value: 100,
              change: 10,
              total: 100,
              color: StatsCardColors.Orange,
            },
            {
              title: 'Total',
              value: 100,
              change: 10,
              total: 100,
              color: StatsCardColors.Yellow,
            },
            {
              title: 'Total',
              value: 100,
              change: 10,
              total: 100,
            },
            {
              title: 'Total',
              value: 100,
              change: 10,
              total: 100,
              color: StatsCardColors.Orange,
            },
            {
              title: 'Total',
              value: 100,
              change: 10,
              total: 100,
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
