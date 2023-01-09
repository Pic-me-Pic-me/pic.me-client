import { UserData, UserInfo } from '../../types/auth';
import { client } from '../axios';

export const getUserInfo = async () => {
  try {
    const data = await client.get<UserData>('/user');
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async () => {
  try {
    const data = await client.delete<UserData>('/user');
    return data.data;
  } catch (err) {
    console.error(err);
  }
};
