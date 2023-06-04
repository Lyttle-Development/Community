import { useEffect } from 'react';
import { getMessage } from '@lyttledev-dashboard/utils';
import { useApp } from '@lyttledev-dashboard/contexts/App.context';

export function usePage(path: string): string {
  const app = useApp();
  const title = getMessage(path);

  // Set selected guild id from router, on initial load
  useEffect(() => {
    app?.setPageTitle(title);
  }, []);

  return title;
}
