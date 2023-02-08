import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { VoteInfo } from '../../types/library';
import { picmeGetFetcher } from '../axios';

export const useGetMonthlyLibraryInfo = (date: number) => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite<AxiosResponse<VoteInfo[]>>(
    (idx: number, monthlyVoteInfo: AxiosResponse<VoteInfo[]>) => {
      // date 받으려고 따로 getKey 선언한걸 뺐어!!!!
      if (idx === 0) return `/vote/library/scroll/month?flag=${0}&date=${date}`;
      console.log(date, 'key', monthlyVoteInfo.data, idx);

      if (monthlyVoteInfo.data[0])
        return `/vote/library/scroll/month?flag=${
          monthlyVoteInfo.data[monthlyVoteInfo.data.length - 1].id
        }&date=${date}`;
      return;
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
  };
};
