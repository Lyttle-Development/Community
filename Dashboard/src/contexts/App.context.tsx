import React, { createContext, useContext } from 'react';
import { storage } from '@lyttledev-dashboard/utils/storage';

export interface AppContextInterface {
  mainNavOpen: boolean;
  setMainNavOpen: (state: boolean) => void;
  toggleMainNav: () => void;
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
  const [mainNavOpen, setMainNavOpen] = React.useState(false);
  const toggleMainNav = () => {
    const state = !mainNavOpen;
    setMainNavOpen(state);
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
        mainNavOpen,
        setMainNavOpen,
        toggleMainNav,
        setSelectedGuildId,
        selectedGuildId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
