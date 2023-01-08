import { AddAccountInfo, SignUpPostInfo } from '../../types/signup';
import { client } from '../axios';

export const checkDuplicateNickname = async (username: string) => {
  console.log(username);
  try {
    const res = await client.get(`/user/name?userName=${username}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const postSignupInfo = async ({ email, password }: AddAccountInfo, username: string) => {
  console.log(email, password, username);
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
