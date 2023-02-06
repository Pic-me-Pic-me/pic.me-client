import { AxiosResponse } from 'axios';

import { client } from '../axios';
import { LoginInfo, UsersResponse, UserToken } from './../../types/auth';

export const postLoginInfo = async ({ email, password }: LoginInfo) => {
  try {
    const res = await client.post(`/auth/signin`, { email, password });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const postKakaoToken = async (socialType: string, token: string) => {
  const { data } = await client.post<UsersResponse>('/auth/kakao/check', {
    socialType,
    token,
  });
  return data.data;
};

export const postKakaoSignIn = async (uid: string, socialType: string) => {
  const { data } = await client.post<UserToken>('/auth/kakao/signin', {
    uid,
    socialType,
  });
  return data.data;
};

export const postKakaoSignUp = async (uid: string, socialType: string, username: string, email: string) => {
  const { data } = await client.post<UserToken>('/auth/kakao', {
    uid,
    socialType,
    userName: username,
    email,
  });
  return data.data;
};

export const deleteUser = async () => {
  try {
    const data = await client.delete<AxiosResponse>('/user');
    return data;
  } catch (err) {
    console.error(err);
  }
};
