import { storage } from '@lyttledev-dashboard/utils';
import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Changes } from '@lyttledev-dashboard/contexts/app-hooks/changes';

export interface GuildInfo {
  id?: string;
  name?: string;
  icon?: string;
}

const GuildQuery = gql`
  query guild($guildId: String!) {
    guild(id: $guildId) {
      discord {
        guild
      }
    }
  }
`;

export function useGuild(
  setChanges: React.Dispatch<React.SetStateAction<Changes>>,
  localGuildChanges: string,
  localSelectedGuildId: string | null,
) {
  const [selectedGuildId, _setSelectedGuildId] = useState(localSelectedGuildId);
  const setSelectedGuildId = (guildId: string | null) => {
    _setSelectedGuildId(guildId);
    storage.set('selectedGuildId', guildId ?? '');
  };

  const selectedGuildIdFromStorage = storage.get('selectedGuildId') ?? '{}';
  const selectedGuildIdFromStorageParsed = JSON.parse(
    selectedGuildIdFromStorage,
  );
  const [selectedGuild, setSelectedGuild] = useState<GuildInfo>(
    selectedGuildIdFromStorageParsed,
  );
  const [fetch, { data: guildData }] = useLazyQuery(GuildQuery);

  useEffect(() => {
    const getIcon = (guild: { id: string; icon: string }) =>
      `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`;
    const guild = guildData?.guild?.discord?.guild ?? null;
    if (!guild) return;
    const _guild = {
      id: guild?.id,
      name: guild?.name,
      icon: getIcon(guild),
    };
    setSelectedGuild(_guild);
    storage.set('selectedGuild', JSON.stringify(_guild));
  }, [guildData]);

  useEffect(() => {
    const guildChanges = storage.get(localGuildChanges) ?? null;
    setChanges(guildChanges ? JSON.parse(guildChanges) : {});
    if (
      (selectedGuildId && selectedGuild.id !== selectedGuildId) ||
      !guildData
    ) {
      void fetch({
        variables: { guildId: selectedGuildId },
      });
    }
  }, [selectedGuildId]);

  return {
    selectedGuildId,
    setSelectedGuildId,
    localSelectedGuildId,
    selectedGuild,
  };
}
