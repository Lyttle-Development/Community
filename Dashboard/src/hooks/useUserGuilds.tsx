import { useEffect, useState } from 'react';
import { useAuth } from '@lyttledev-dashboard/hooks/useAuth';
import { gql, useLazyQuery } from '@apollo/client';

const guildsQuery = gql`
  query guilds {
    guilds {
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
      }
    }
    discord {
      userGuilds
    }
  }
`;

export function useUserGuilds() {
  const authorized = useAuth();
  const [guilds, setGuilds] = useState<any[]>([]);
  const [ownedGuilds, setOwnedGuilds] = useState<any[]>([]);
  const [moderateGuilds, setModerateGuilds] = useState<any[]>([]);

  const [fetch, { data }] = useLazyQuery(guildsQuery);

  useEffect(() => {
    if (!data) return;

    const _ownedGuilds = data?.discord?.userGuilds?.filter(
      (guild: any) => guild.owner === true,
    );
    setOwnedGuilds(_ownedGuilds);

    const _moderateGuilds = data?.discord?.userGuilds?.filter(
      (guild: any) => guild.permissions === 2147483647 && guild.owner === false,
    );
    setModerateGuilds(_moderateGuilds);

    const _guilds: any[] = [..._ownedGuilds, ..._moderateGuilds];
    setGuilds(_guilds);
  }, [data]);

  useEffect(() => {
    if (!authorized) return;
    void fetch();
  }, [authorized]);

  return { data, guilds, ownedGuilds, moderateGuilds };
}
