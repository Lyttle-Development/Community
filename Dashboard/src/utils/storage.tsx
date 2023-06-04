export const storage = {
  get: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
  },
  set: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.setItem(key, value);
    }
  },
};
