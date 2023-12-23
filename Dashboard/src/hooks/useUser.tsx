import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner: string;
  accent_color: number;
  global_name: string;
  avatar_decoration_data: DiscordUserAvatarDecorationData;
  banner_color: string;
  mfa_enabled: boolean;
  locale: string;
}

export interface DiscordUserAvatarDecorationData {
  asset: string;
  sku_id: string;
}

const getDiscordUserQuery = gql`
  query getDiscordUser {
    discord {
      user
    }
  }
`;

export function useUser(): DiscordUser | null {
  const [selectedUser, setSelectedUser] = useState<DiscordUser | null>(null);
  const [fetch, { data }] = useLazyQuery(getDiscordUserQuery);

  useEffect(() => {
    if (data?.discord?.user) {
      setSelectedUser(data.discord.user as DiscordUser);
    } else {
      void fetch();
    }
  }, [data, selectedUser]);

  return selectedUser;
}
