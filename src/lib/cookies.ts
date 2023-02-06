import { Cookies } from 'react-cookie';

const cookies = new Cookies();

class Cookie {
  static setRefreshToken(key: string, item: string) {
    if (typeof window !== 'undefined') {
      cookies.set(key, item, { httpOnly: true });
    }
  }

  static getRefreshToken(key: string) {
    if (typeof window !== 'undefined') {
      return cookies.get(key) as string;
    }
    return '';
  }

  static removeRefreshToken(key: string) {
    if (typeof window !== 'undefined') cookies.remove(key);
  }

  static setUserRefreshToken(refreshToken: string) {
    this.setRefreshToken('refreshToken', refreshToken);
  }

  static clearUserRefreshToken() {
    this.removeRefreshToken('refreshToken');
  }
}

export default Cookie;
