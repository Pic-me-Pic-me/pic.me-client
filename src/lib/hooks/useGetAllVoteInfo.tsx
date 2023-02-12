import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { EndedVoteInfo } from '../../types/library';
import { picmeGetFetcher } from '../axios';

//세로 무한스크롤
const getKey = (prevLastDate: number, allVoteInfo: AxiosResponse<EndedVoteInfo>) => {
  if (prevLastDate === 0) return `/vote/library/scroll/all?flag=${prevLastDate}`;
  if (allVoteInfo) return `/vote/library/scroll/all?flag=${allVoteInfo.data.dates[allVoteInfo.data.dates.length - 1]}`;
  return null;
};

export const useGetAllVoteInfo = () => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite<AxiosResponse<EndedVoteInfo>>(
    getKey,
    picmeGetFetcher,
    {
      errorRetryCount: 3,
      revalidateOnMount: true,
    },
  );

  const parseResultList = data?.map((item) => item.data.dates).flat();

  return {
    allVoteInfoList: { dateList: parseResultList ? parseResultList : [] },
    isLoading,
    isError: error,
    size,
    setSize,
  };
};
