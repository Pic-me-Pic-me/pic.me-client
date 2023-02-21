import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setAccessToken = (key: string, item: string) => {
  localStorage.setItem(key, item);
};

export const getAccessToken = (key: string) => localStorage.getItem(key) as string;

export const removeAccessToken = (key: string) => {
  localStorage.removeItem(key);
};

export const setRefreshToken = (key: string, item: string) => {
  cookies.set(key, item, { path: '/', httpOnly: true, secure: true, sameSite: 'none' });
};

export const getRefreshToken = (key: string) => cookies.get(key) as string;

export const removeRefreshToken = (key: string) => {
  cookies.remove(key);
};

export const setUserSession = (accessToken: string, refreshToken: string) => {
  setAccessToken('accessToken', accessToken);
  setRefreshToken('refreshToken', refreshToken);
};

export const clearUserSession = () => {
  removeAccessToken('accessToken');
  removeAccessToken('kakaoAccessToken');
  removeRefreshToken('refreshToken');
};
