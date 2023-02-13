import { AddAccountInfo } from '../../types/signup';
import { client } from '../axios';

export const postSignupInfo = async ({ email, password }: AddAccountInfo, username: string) => {
  try {
    const res = await client.post(`/auth`, {
      email,
      password,
      username,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
