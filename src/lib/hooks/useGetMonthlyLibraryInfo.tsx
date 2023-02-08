import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { VoteInfo } from '../../types/library';
import { picmeGetFetcher } from '../axios';

//가로 무한 스크롤

const getKey = (idx: number, monthlyVoteInfo: AxiosResponse<VoteInfo[]>) => {
  console.log(monthlyVoteInfo);
  //처음 호출할 때 세로 스크롤에서 처음에 받아온 아이템 5개 중 마지막 아이템의 아이디랑, 날짜를 받아와야하는데 원래는 컴포넌트 단위에서 props로 넘겨줬는데 이거는 어케해야되지 흠흠
  if (idx === 0) return `/vote/library/scroll/month?flag=${idx}&date=${idx}`;
  if (monthlyVoteInfo)
    return `/vote/library/scroll/month?flag=${monthlyVoteInfo.data[monthlyVoteInfo.data.length - 1].id}&date=${202210}`;
  return;
};

export const useGetMonthlyLibraryInfo = () => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite<AxiosResponse<VoteInfo[]>>(getKey, picmeGetFetcher, {
    errorRetryCount: 3,
  });

  const parseResultList = data?.map((item) => item.data).flat();

  console.log(parseResultList);

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
