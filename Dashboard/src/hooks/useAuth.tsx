import { useEffect, useState } from 'react';
import { Constants } from '@lyttledev-dashboard/constants';

export function useAuth() {
  const [authorized, setAuthorized] = useState(false);

  const login = (): void => {
    window.location.href = Constants.loginUrl;
  };

  const check = async (): Promise<void> => {
    const res: Response = await fetch(Constants.checkLoginUrl, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': Constants.checkLoginUrl,
      },
      credentials: 'include',
    });

    if (res.status !== 200) {
      return login();
    }
    setAuthorized(true);
  };

  useEffect(() => {
    void check();
  }, []);

  return authorized;
}

function clearCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

export function logout() {
  clearCookie('accessToken');
  clearCookie('refreshToken');
  window.location.href = Constants.logoutUrl;
}
