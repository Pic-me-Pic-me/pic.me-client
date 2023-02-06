import useSWR from 'swr';

import { picmeGetFetcher } from '../axios';

export const useGetUsernameCheck = (username: string) => {
  const { data, error } = useSWR(`/user/name?userName=${username}`, picmeGetFetcher, {
    errorRetryCount: 3,
  });
  return {
    isNicknamePossible: data?.success,
    isLoading: !error && !data,
    isError: error,
  };
};
