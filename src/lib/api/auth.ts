import axios from 'axios';

import { UserData, UsersResponse, UserToken } from '../../types/auth';
import { client } from '../axios';

export const postKakaoToken = async (socialType: string, token: string) => {
  const { data } = await client.post<UsersResponse>('/auth/kakao/check', {
    socialType,
    token,
  });
  console.log('postKakaoToken:', data.data);
  return data.data;
};

export const postKakaoSignIn = async (uid: string, socialType: string) => {
  const { data } = await client.post<UserToken>('/auth/kakao/signin', {
    uid,
    socialType,
  });
  console.log('postKakaoSignIn:', data.data);
  return data.data;
};

export const postKakaoSignUp = async (uid: string, socialType: string, user_name: string, email: string) => {
  const { data } = await client.post<UserToken>('/auth/kakao', {
    uid,
    socialType,
    email,
    user_name,
  });
  console.log('postKakaoSignUp:', data);
  return data;
};

export const deleteUser = async () => {
  try {
    const data = await client.delete<UserData>('/user');
    return data.data;
  } catch (err) {
    console.error(err);
  }
};
