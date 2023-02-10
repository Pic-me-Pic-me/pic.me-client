import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const Token = () => {
  const setAccessToken = (key: string, item: string) => {
    localStorage.setItem(key, item);
  };

  const getAccessToken = (key: string) => localStorage.getItem(key) as string;

  const removeAccessToken = (key: string) => {
    localStorage.removeItem(key);
  };

  const setRefreshToken = (key: string, item: string) => {
    cookies.set(key, item, { httpOnly: true });
  };

  const getRefreshToken = (key: string) => cookies.get(key) as string;

  const removeRefreshToken = (key: string) => {
    cookies.remove(key);
  };

  const setUserSession = (accessToken: string, refreshToken: string) => {
    setAccessToken('accessToken', accessToken);
    setRefreshToken('refreshToken', refreshToken);
  };

  const clearUserSession = () => {
    removeAccessToken('accessToken');
    removeAccessToken('kakaoAccessToken');
    removeRefreshToken('refreshToken');
  };

  return {
    setAccessToken,
    getAccessToken,
    removeAccessToken,
    setRefreshToken,
    getRefreshToken,
    removeRefreshToken,
    setUserSession,
    clearUserSession,
  };
};

export default Token;
