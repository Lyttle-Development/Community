import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '@lyttledev-dashboard/utils/storage';
import { getMessage } from '@lyttledev-dashboard/utils';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { useWindowSize } from '@lyttledev-dashboard/hooks/useWindowSize';
import { Constants } from '@lyttledev-dashboard/constants';

export interface AppContextInterface {
  mainNavOpen: boolean;
  setMainNavOpen: (state: boolean) => void;
  toggleMainNav: () => void;
  selectedGuildId: string | null;
  setSelectedGuildId: (guildId: string | null) => void;
  pageTitle: string;
  setPageTitle: (title: string) => void;
  mobile: boolean;
  setMobile: (state: boolean) => void;
}

export type AppContextType = AppContextInterface | null;
export const AppContext = createContext<AppContextType>(null);

export const useApp = () => useContext(AppContext);

export interface AppContextProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppContextProps) {
  const windowSize = useWindowSize();
  const [initialized, setIsInitialized] = useState<Date | null>(null);
  const [mainNavOpen, setMainNavOpen] = useState(false);
  const toggleMainNav = () => {
    const state = !mainNavOpen;
    setMainNavOpen(state);
  };

  const localSGI = storage.get('selectedGuildId') ?? null;
  const localSelectedGuildId = localSGI === '' ? null : localSGI;
  const [selectedGuildId, _setSelectedGuildId] = useState(localSelectedGuildId);
  const setSelectedGuildId = (guildId: string | null) => {
    _setSelectedGuildId(guildId);
    storage.set('selectedGuildId', guildId ?? '');
  };

  const homeTitle = getMessage(pagesPrefix + 'home.title');
  const [pageTitle, setPageTitle] = useState(homeTitle);
  const [mobile, setMobile] = useState<boolean>(true);

  useEffect(() => {
    const isMobile = windowSize.width
      ? windowSize.width < Constants.mobileWidth
      : true;

    if (!windowSize?.width) return;
    if (!initialized) setIsInitialized(new Date());

    if (isMobile !== mobile) {
      setMobile(isMobile);

      if (!isMobile === mainNavOpen) return;
      const now = new Date();
      const time = initialized ? now.getTime() - initialized.getTime() : 0;
      if (time < 2000) return;
      setMainNavOpen(!isMobile);
    }
  }, [windowSize, mobile]);

  useEffect(() => {
    if (mobile && mainNavOpen) setMainNavOpen(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        mainNavOpen,
        setMainNavOpen,
        toggleMainNav,
        setSelectedGuildId,
        selectedGuildId,
        pageTitle,
        setPageTitle,
        mobile,
        setMobile,
      }}
    >
      {initialized && children}
    </AppContext.Provider>
  );
}
