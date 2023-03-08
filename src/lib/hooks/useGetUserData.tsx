import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { MemberData } from '../../types/auth';
import { picmeGetFetcher } from '../axios';

const useGetUserData = () => {
  const { data, error } = useSWR<AxiosResponse<MemberData>>('/user', picmeGetFetcher, {
    errorRetryCount: 3,
  });
  return {
    userInfo: data?.data,
    isError: error,
  };
};

export default useGetUserData;
