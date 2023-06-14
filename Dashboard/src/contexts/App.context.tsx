import React, { createContext, useContext, useState } from 'react';
import { useMainNav } from '@lyttledev-dashboard/contexts/app-hooks/main-nav';
import {
  ChangeProps,
  Changes,
  GuildInfo,
  useChanges,
  useGuild,
  useMobile,
  useTitle,
} from '@lyttledev-dashboard/contexts/app-hooks';
import { storage } from '@lyttledev-dashboard/utils';

export interface AppContextInterface {
  mainNavOpen: boolean;
  setMainNavOpen: (state: boolean) => void;
  toggleMainNav: () => void;
  selectedGuildId: string | null;
  selectedGuild: GuildInfo;
  setSelectedGuildId: (guildId: string | null) => void;
  pageTitle: string;
  setPageTitle: (title: string) => void;
  mobile: boolean;
  setMobile: (state: boolean) => void;
  changes: Changes;
  change: (props: ChangeProps) => void;
}

export type AppContextType = AppContextInterface | null;
export const AppContext = createContext<AppContextType>(null);

export const useApp = () => useContext(AppContext);

export interface AppContextProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppContextProps) {
  const [initialized, setIsInitialized] = useState<Date | null>(null);

  const localSGI = storage.get('selectedGuildId') ?? null;
  const localSelectedGuildId = localSGI === '' ? null : localSGI;
  const {
    changes,
    change,
    setChanges,
    localGuildChanges, //
  } = useChanges(localSelectedGuildId);

  const {
    selectedGuildId,
    setSelectedGuildId,
    selectedGuild, //
  } = useGuild(setChanges, localGuildChanges, localSelectedGuildId);

  const {
    mainNavOpen,
    setMainNavOpen,
    toggleMainNav, //
  } = useMainNav();

  const {
    pageTitle,
    setPageTitle, //
  } = useTitle();

  const {
    mobile,
    setMobile, //
  } = useMobile(mainNavOpen, setMainNavOpen, initialized, setIsInitialized);

  return (
    <AppContext.Provider
      value={{
        mainNavOpen,
        setMainNavOpen,
        toggleMainNav,
        setSelectedGuildId,
        selectedGuildId,
        selectedGuild,
        pageTitle,
        setPageTitle,
        mobile,
        setMobile,
        changes,
        change,
      }}
    >
      {initialized && children}
    </AppContext.Provider>
  );
}
