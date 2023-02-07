import { AxiosResponse } from 'axios';

import { client } from '../axios';
import { LoginInfo, MemberData, UserInfo, UserToken } from './../../types/auth';

export const postLoginInfo = async ({ email, password }: LoginInfo) => {
  try {
    const res = await client.post(`/auth/signin`, { email, password });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const postKakaoToken = async (token: string) => {
  const { data } = await client.post<AxiosResponse<UserInfo>>('/auth/kakao/check', {
    socialType: 'kakao',
    token,
  });
  return data.data;
};

export const postKakaoSignIn = async (uid: string) => {
  const { data } = await client.post<UserToken>('/auth/kakao/signin', {
    uid,
    socialType: 'kakao',
  });
  return data.data;
};

export const postKakaoSignUp = async (uid: string, username: string) => {
  const { data } = await client.post<UserToken>('/auth/kakao', {
    uid,
    socialType: 'kakao',
    userName: username,
    email: '',
  });
  return data.data;
};

export const getUserInfo = async () => {
  try {
    const data = await client.get<AxiosResponse<MemberData>>('/user');
    return data.data;
  } catch (err) {
    console.error(err);
    return { data: undefined };
  }
};

export const deleteUser = async () => {
  try {
    const data = await client.delete<AxiosResponse>('/user');
    return data;
  } catch (err) {
    console.error(err);
  }
};
