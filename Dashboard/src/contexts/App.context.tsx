import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '@lyttledev-dashboard/utils/storage';
import { getMessage } from '@lyttledev-dashboard/utils';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { useWindowSize } from '@lyttledev-dashboard/hooks/useWindowSize';
import { Constants } from '@lyttledev-dashboard/constants';

export type Change = string | number | boolean | null;

export interface ChangeObject {
  original: Change;
  current: Change;
  store: Change;
  amount: Change;
}

export interface Changes {
  [key: string]: ChangeObject;
}

interface ChangeProps {
  remove?: string | string[];
  update?:
    | {
        key: string;
        value?: Change;
        initial?: Change;
        store?: Change;
        amount?: Change;
      }
    | {
        key: string;
        value?: Change;
        initial?: Change;
        store?: Change;
        amount?: Change;
      }[];
}

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

  const localGuildChanges = localSelectedGuildId
    ? 'changes_' + localSelectedGuildId
    : 'changes';
  const localChanges = storage.get(localGuildChanges) ?? null;
  const [changes, setChanges] = useState<Changes>(
    localChanges ? JSON.parse(localChanges) : {},
  );

  useEffect(() => {
    const guildChanges = storage.get(localGuildChanges) ?? null;
    setChanges(guildChanges ? JSON.parse(guildChanges) : {});
  }, [selectedGuildId]);

  useEffect(() => {
    storage.set(localGuildChanges, JSON.stringify(changes));
  }, [changes]);

  const change = ({ remove, update }: ChangeProps) => {
    // Check for reset.
    if (update) {
      const updateKeys = (Array.isArray(update) ? update : [update]) //
        // Get keys only
        .map((e) => e.key);

      // Check if we have reset key.
      const hasResetKey = updateKeys.includes('reset');
      // Reset when we have reset key.
      if (hasResetKey) return setChanges({});
    }

    // Get current changes.
    const newChanges: Changes = { ...changes };

    // Remove changes.
    if (remove) {
      // Get al remove keys.
      const removeKeys = Array.isArray(remove) ? remove : [remove];
      // Check if we have remove keys.
      if (removeKeys.length > 0) {
        // Remove keys.
        removeKeys.forEach((key) => delete newChanges[key]);
      }
    }

    // Update changes.
    if (update) {
      // Get all updates.
      const updates = Array.isArray(update) ? update : [update];
      // Check if we have updates.
      if (updates.length > 0) {
        // Update changes.
        updates.forEach(({ initial, key, value, store, amount }) => {
          // Check if we have value.
          if (value === undefined || initial === undefined) return;
          // Update change.
          newChanges[key] = {
            original: initial,
            current: value,
            store: store ?? null,
            amount: amount ?? null,
          };
        });
      }
    }

    const filteredChanges: Changes = checkDuplicateChanges(newChanges);
    setChanges(filteredChanges);
  };

  const checkDuplicateChanges = (newChanges: Changes): Changes => {
    const filteredChanges: Changes = {};
    Object.keys(newChanges).forEach((key) => {
      if (newChanges[key].original !== newChanges[key].current) {
        filteredChanges[key] = newChanges[key];
      }
    });
    return filteredChanges;
  };

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
        changes,
        change,
      }}
    >
      {initialized && children}
    </AppContext.Provider>
  );
}
