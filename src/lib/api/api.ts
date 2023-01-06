import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://2b75275e-7919-416d-b7e7-2a85c9d3cb70.mock.pstmn.io/auth/kakao',
  headers: {
    'Content-type': 'application/json',
  },
});

type UserInfo = {
  isUser: boolean;
  uid: string;
};

type UsersResponse = {
  data: UserInfo;
};

type UserTokenInfo = {
  id: number;
  userName: string;
  accessToken: string;
  refreshToken: string;
};

type UserToken = {
  data: UserTokenInfo;
};

export const postKakaoToken = async (socialType: string, token: string) => {
  const { data } = await client.post<UsersResponse>('/check', {
    socialType,
    token,
  });
  console.log('postKakaoToken:', data.data);
  return data.data;
};

export const postKakaoSignIn = async (uid: string, socialType: string) => {
  const { data } = await client.post<UserToken>('/signin', {
    uid,
    socialType,
  });
  console.log('postKakaoSignIn:', data.data);
  return data.data;
};

export const postKakaoSignUp = async (uid: string, socialType: string, user_name: string) => {
  const { data } = await client.post<UserToken>('', {
    uid,
    socialType,
    user_name,
  });
  console.log('postKakaoSignUp:', data);
  return data;
};
