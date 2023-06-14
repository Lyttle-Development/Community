import { useState } from 'react';

export function useMainNav() {
  const [mainNavOpen, setMainNavOpen] = useState(false);
  const toggleMainNav = () => {
    const state = !mainNavOpen;
    setMainNavOpen(state);
  };

  return {
    mainNavOpen,
    setMainNavOpen,
    toggleMainNav,
  };
}
