import { UserData, UserInfo } from '../../types/auth';
import { client } from '../axios';

export const getUserInfo = async () => {
  try {
    const data = await client.get<UserData>('/user');
    console.log('data', data.data);
    return data.data;
  } catch (err) {
    console.error(err);
  }
};
