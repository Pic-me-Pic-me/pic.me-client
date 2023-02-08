import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { EndedVoteInfo } from '../../types/library';
import { picmeGetFetcher } from '../axios';

//세로 무한스크롤
const getKey = (prevLastDate: number, allVoteInfo: AxiosResponse<EndedVoteInfo[]>) => {
  if (prevLastDate === 0) {
    return `/vote/library/scroll/all?flag=${prevLastDate}`;
  }
  if (allVoteInfo) {
    return `/vote/library/scroll/all?flag=${allVoteInfo.data[allVoteInfo.data.length - 1].date}`;
  }
  return;
};

export const useGetAllVoteInfo = () => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite<AxiosResponse<EndedVoteInfo[]>>(
    getKey,
    picmeGetFetcher,
    {
      errorRetryCount: 3,
    },
  );

  const parseResultList = data?.map((item) => item.data).flat();

  console.log(parseResultList);

  return {
    allVoteInfoList: {
      list: parseResultList ? parseResultList : [],
    },
    isLoading,
    isError: error,
    size,
    setSize,
  };
};
