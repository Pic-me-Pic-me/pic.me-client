import { LoginInfo } from '../../types/auth';
import { client } from '../axios';

export const postLoginInfo = async ({ email, password }: LoginInfo) => {
  try {
    const res = await client.post(`/auth/signin`, { email, password });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
