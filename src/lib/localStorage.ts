class LocalStorage {
  //   constructor() {}

  static setItem(key: string, item: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, item);
    }
  }

  static getItem(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) as string;
    }
    return '';
  }

  static removeItem(key: string) {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  }

  static setUserSession(accessToken: string) {
    this.setItem('accessToken', accessToken);
  }

  static clearUserSession() {
    this.removeItem('accessToken');
  }
}

export default LocalStorage;
