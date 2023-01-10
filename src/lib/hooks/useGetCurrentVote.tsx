import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { CurrentVoteInfo } from '../../types/voting';
import { picmeGetFetcher } from '../axios';

export const useGetCurrentVote = (voteid: string | undefined) => {
  const { data, error } = useSWR<AxiosResponse<CurrentVoteInfo>>(
    `/vote/maker/singleResult/${voteid}`,
    picmeGetFetcher,
    {
      // 실패시 재요청 3번
      errorRetryCount: 3,
    },
  );

  return {
    currentVoteInfo: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};
