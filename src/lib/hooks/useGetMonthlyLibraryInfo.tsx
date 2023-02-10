import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { VoteInfo } from '../../types/library';
import { picmeGetFetcher } from '../axios';

export const useGetMonthlyLibraryInfo = (date: number) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<AxiosResponse<VoteInfo[]>>(
    (idx: number, monthlyVoteInfo: AxiosResponse<VoteInfo[]>) => {
      if (idx === 0) return `/vote/library/scroll/month?flag=${0}&date=${date}`;
      if (monthlyVoteInfo.data[0])
        return `/vote/library/scroll/month?flag=${
          monthlyVoteInfo.data[monthlyVoteInfo.data.length - 1].id
        }&date=${date}`;
      return null;
    },
    picmeGetFetcher,
    {
      errorRetryCount: 3,
    },
  );

  const parseResultList = data?.map((item) => item.data).flat();

  return {
    monthlyVoteInfoList: {
      list: parseResultList ? parseResultList : [],
    },
    isLoading,
    isError: error,
    size,
    setSize,
    mutate,
  };
};
