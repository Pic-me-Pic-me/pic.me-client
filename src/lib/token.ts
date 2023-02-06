import { Cookies } from 'react-cookie';

const cookies = new Cookies();

class Token {
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

  static removeAccessToken(key: string) {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  }

  static removeRefreshToken(key: string) {
    if (typeof window !== 'undefined') cookies.remove(key);
  }

  static setUserSession(accessToken: string, refreshToken: string) {
    this.setAccessToken('accessToken', accessToken);
    this.setRefreshToken('refreshToken', refreshToken);
  }

  static clearUserSession() {
    this.removeAccessToken('accessToken');
    this.removeAccessToken('kakaoAccessToken');
    this.removeRefreshToken('refreshToken');
  }
}

export default Token;
