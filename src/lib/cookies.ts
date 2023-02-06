import { Cookies } from 'react-cookie';

const cookies = new Cookies();

class Cookie {
  //   constructor() {}

  static setItem(key: string, item: string) {
    if (typeof window !== 'undefined') {
      cookies.set(key, item, { httpOnly: true });
    }
  }

  static getItem(key: string) {
    if (typeof window !== 'undefined') {
      return cookies.get(key) as string;
    }
    return '';
  }

  static removeItem(key: string) {
    if (typeof window !== 'undefined') cookies.remove(key);
  }

  static setUserSession(refreshToken: string) {
    this.setItem('refreshToken', refreshToken);
  }

  static clearUserSession() {
    this.removeItem('refreshToken');
  }
}

export default Cookie;
