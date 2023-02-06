import { client } from '../axios';
import { DeleteUserInfo, GetUserData, LoginInfo, UsersResponse, UserToken } from './../../types/auth';

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

export const getUserInfo = async () => {
  try {
    const data = await client.get<GetUserData>('/user');
    return data.data;
  } catch (err) {
    console.error(err);
    return { data: undefined };
  }
};
export const deleteUser = async () => {
  try {
    const data = await client.delete<DeleteUserInfo>('/user');
    return data;
  } catch (err) {
    console.error(err);
  }
};
