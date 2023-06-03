import { Layout } from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { useEffect, useState } from 'react';
import { getMessage } from '@lyttledev-dashboard/utils';

function Page() {
  const title = usePage(pagesPrefix + 'overview.title');
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const msgRecommendation = getMessage(
    pagesPrefix + 'overview.recommendation.title',
  );

  useEffect(() => {
    setTimeout(() => {
      setRecommendation(
        'After some deep analysis, we recommend you to, handle this and handle that. That way you can imrove that while tweaking this. While tweaking that you could do that meaning it could fix what and when it does it can whathever you want.',
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
          key={'overview.recommendation'}
        />
      </Component.Container>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
