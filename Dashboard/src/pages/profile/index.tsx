import { Layout } from '@lyttledev-dashboard/layouts';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { useEffect } from 'react';
import { usePage } from '@lyttledev-dashboard/hooks/usePage';
import { Component } from '@lyttledev-dashboard/components';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';
import { useGuild } from '@lyttledev-dashboard/hooks/useGuild';
import { useUser } from '@lyttledev-dashboard/hooks/useUser';

// Variables:
const pfx = pagesPrefix + 'profile.';

function Page() {
  const authorized = useAuth();
  const guildId = useGuild();
  const user = useUser();
  const title = usePage(pfx + 'title');

  useEffect(() => {
    if (!authorized || !guildId) return;
  }, [authorized, guildId]);

  return (
    <>
      <Component.Title>{title}</Component.Title>
      {user && (
        <Component.Container>
          <Component.Card>
            <p>
              Hello {user.global_name}! (@{user.username})
              <br />
              This page is still in development, but you can see your user
            </p>
          </Component.Card>
        </Component.Container>
      )}
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
