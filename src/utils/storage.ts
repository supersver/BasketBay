const storagePrefix = "basketbay_";

const storage = {
  getAccessToken: (): string | null => {
    return localStorage.getItem(`${storagePrefix}accessToken`);
  },
  setAccessToken: (token: string) => {
    localStorage.setItem(`${storagePrefix}accessToken`, token);
  },
  removeAccessToken: () => {
    localStorage.removeItem(`${storagePrefix}accessToken`);
  },
  setItem: (key: string, value: string) => {
    localStorage.setItem(`${storagePrefix}${key}`, value);
  },
  getItem: (key: string): string | null => {
    return localStorage.getItem(`${storagePrefix}${key}`);
  },
  removeItem: (key: string) => {
    localStorage.removeItem(`${storagePrefix}${key}`);
  },
  clear: () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(storagePrefix)) {
        localStorage.removeItem(key);
      }
    });
  },
};

export default storage;
