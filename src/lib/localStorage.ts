class LocalStorage {
  static setAccessToken(key: string, item: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, item);
    }
  }

  static getAccessToken(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) as string;
    }
    return '';
  }

  static removeAccessToken(key: string) {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  }

  static setUserAccessToken(accessToken: string) {
    this.setAccessToken('accessToken', accessToken);
  }

  static clearAccessToken() {
    this.removeAccessToken('accessToken');
  }
}

export default LocalStorage;
