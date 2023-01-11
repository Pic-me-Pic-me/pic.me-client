import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { CurrentVoteInfo } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

export const useGetCurrentVote = (voteid: string | undefined) => {
  const { data, error } = useSWR<AxiosResponse<CurrentVoteInfo>>(
    `/vote/maker/singleResult/${voteid}`,
    picmeGetFetcher,
    {
      errorRetryCount: 3,
    },
  );
  return {
    currentVoteInfo: data,
    // isLoading: !error && !data,
    isError: error,
  };
};
