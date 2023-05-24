import React, { createContext, useContext } from 'react';

export interface AppContextInterface {
  toggleMainNav: () => void;
  mainNavOpen: boolean;
}

export type AppContextType = AppContextInterface | null;
export const AppContext = createContext<AppContextType>(null);

export const useApp = () => useContext(AppContext);

export interface AppContextProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppContextProps) {
  const [mainNavOpen, setMainNavOpen] = React.useState(true);
  const toggleMainNav = () => setMainNavOpen(!mainNavOpen);

  return (
    <AppContext.Provider
      value={{
        toggleMainNav,
        mainNavOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
