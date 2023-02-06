import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { VoteInfo } from '../../types/library';
import { picmeGetFetcher } from '../axios';

//가로 무한 스크롤
export const useGetMonthlyLibraryInfo = (lastItemId: string, date: number) => {
  const { data, error } = useSWR<AxiosResponse<VoteInfo[]>>(
    `/vote/library/scroll/month?flag=${lastItemId}&date=${date}`,
    picmeGetFetcher,
    {
      errorRetryCount: 3,
    },
  );

  return {
    monthlyVoteInfo: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
  };
};
