import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { VoteInfoProps } from '../../types/voting';
import { picmeGetFetcher } from '../axios';

export const useGetCurrentVote = (voteid: string | undefined) => {
  const { data, error } = useSWR<AxiosResponse<VoteInfoProps>>(`/vote/maker/singleResult/${voteid}`, picmeGetFetcher, {
    // 실패시 재요청 3번
    errorRetryCount: 3,
  });
  console.log(data?.data);

  return {
    currentVoteInfo: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};
