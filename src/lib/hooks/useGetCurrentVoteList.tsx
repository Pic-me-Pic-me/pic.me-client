import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { VoteResultData } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

const getKey = (cursorIdx: number, voteListData: AxiosResponse<VoteResultData>) => {
  if (cursorIdx === 0) return `vote/list/${cursorIdx}`;
  if (voteListData.data) return `vote/list/${voteListData.data.resCursorId}`;
  return null;
};

const useGetCurrentVoteList = () => {
  const { data, isLoading, error, setSize } = useSWRInfinite<AxiosResponse<VoteResultData>>(getKey, picmeGetFetcher, {
    persistSize: true,
    revalidateFirstPage: false,
  });

  const lastData = data?.[data.length - 1].data.result;
  const parseResultList = data
    ?.map((item) => item.data.result)
    .flat()
    .filter((result) => result);

  return {
    voteListResult: {
      result: parseResultList ? parseResultList : [],
    },
    isLoading,
    isError: error,
    isEnd: lastData === undefined,
    setSize,
  };
};

export default useGetCurrentVoteList;
