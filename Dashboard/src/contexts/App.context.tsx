import React, { createContext, useContext, useEffect, useState } from 'react';
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
  change: (props: ChangeProps) => void;
  changes: Changes;
  mainNavOpen: boolean;
  mobile: boolean;
  pageTitle: string;
  resetChanges: () => void;
  selectedGuild: GuildInfo;
  selectedGuildId: string | null;
  setMainNavOpen: (state: boolean) => void;
  setMobile: (state: boolean) => void;
  setPageTitle: (title: string) => void;
  setSelectedGuildId: (guildId: string | null) => void;
  toggleMainNav: () => void;
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
    resetChanges,
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
  } = useMobile(mainNavOpen, setMainNavOpen, initialized);

  useEffect(() => {
    if (!initialized) setIsInitialized(new Date());
  }, []);

  return (
    <AppContext.Provider
      value={{
        change,
        changes,
        mainNavOpen,
        mobile,
        pageTitle,
        resetChanges,
        selectedGuild,
        selectedGuildId,
        setMainNavOpen,
        setMobile,
        setPageTitle,
        setSelectedGuildId,
        toggleMainNav,
      }}
    >
      {initialized && children}
    </AppContext.Provider>
  );
}
