import { AxiosResponse } from 'axios';
import useSWR from 'swr';

// import { AddAccountInfo, SignUpPostInfo } from '../../types/signup';
import { client } from '../axios';

export const useCheckDuplicateNickname = (username: string) => {
  const { data, error } = useSWR<AxiosResponse<boolean>>(`/user/name?userName=${username}`, client.get);
  console.log(data, error);
  return data;
};

// export const usePostSignupInfo = ({ email, password }: AddAccountInfo, username: string) => {
//   const { data, error } = useSWR(`/auth`, client.post);
//   console.log(data, error);
//   return data;
// };
