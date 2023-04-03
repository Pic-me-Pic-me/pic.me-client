import { AxiosResponse } from 'axios';

import { UserTokenInfo } from '../../types/auth';
import { AddAccountInfo } from '../../types/signup';
import { client } from '../axios';

export const getEmailCheck = async (email: string) => {
  try {
    const res = await client.get(`/user/email?email=${email}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsernameCheck = async (username: string) => {
  try {
    const res = await client.get(`/user/name?userName=${username}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const postSignupInfo = async ({ email, password }: AddAccountInfo, username: string) => {
  try {
    const res = await client.post<AxiosResponse<UserTokenInfo>>(`/auth`, {
      email,
      password,
      username,
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
