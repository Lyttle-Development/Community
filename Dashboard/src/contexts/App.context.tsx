import React, { createContext, useContext } from 'react';
import { storage } from '@lyttledev-dashboard/utils/storage';

export interface AppContextInterface {
  toggleMainNav: () => void;
  mainNavOpen: boolean;
  selectedGuildId: string | null;
  setSelectedGuildId: (guildId: string | null) => void;
}

export type AppContextType = AppContextInterface | null;
export const AppContext = createContext<AppContextType>(null);

export const useApp = () => useContext(AppContext);

export interface AppContextProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppContextProps) {
  const localMainNavOpen = (storage.get('mainNavOpen') ?? 'true') === 'true';
  const [mainNavOpen, setMainNavOpen] = React.useState(localMainNavOpen);
  const toggleMainNav = () => {
    const state = !mainNavOpen;
    setMainNavOpen(state);
    storage.set('mainNavOpen', JSON.stringify(state));
  };

  const localSGI = storage.get('selectedGuildId') ?? null;
  const localSelectedGuildId = localSGI === '' ? null : localSGI;
  const [selectedGuildId, _setSelectedGuildId] =
    React.useState(localSelectedGuildId);
  const setSelectedGuildId = (guildId: string | null) => {
    _setSelectedGuildId(guildId);
    storage.set('selectedGuildId', guildId ?? '');
  };

  return (
    <AppContext.Provider
      value={{
        toggleMainNav,
        mainNavOpen,
        setSelectedGuildId,
        selectedGuildId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
