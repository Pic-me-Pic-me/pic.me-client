import { AddAccountInfo } from '../../types/signup';
import { client } from '../axios';

export const checkDuplicateNickname = async (nickname: string) => {
  try {
    const res = await client.post(`/user/name`, { nickname });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const postSignupInfo = async ({ user_id, password }: AddAccountInfo, nickname: string) => {
  try {
    const res = await client.post(`/auth`, {
      user_id,
      password,
      nickname,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
