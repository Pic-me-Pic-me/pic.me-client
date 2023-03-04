import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setAccessToken = (key: string, item: string) => {
  localStorage.setItem(key, item);
};

export const getAccessToken = (key: string) => localStorage.getItem(key) as string;

export const removeAccessToken = (key: string) => {
  localStorage.removeItem(key);
};

export const setUserSession = (accessToken: string) => {
  setAccessToken('accessToken', accessToken);
};

export const clearUserSession = () => {
  removeAccessToken('accessToken');
  removeAccessToken('kakaoAccessToken');
};
