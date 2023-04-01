import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { VoteResultData } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

const getKey = (cursorIdx: number, voteListData: AxiosResponse<VoteResultData>) =>
  cursorIdx === 0 ? `vote/list/${cursorIdx}` : voteListData.data ? `vote/list/${voteListData.data.resCursorId}` : null;

const useGetCurrentVoteList = () => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite<AxiosResponse<VoteResultData>>(
    getKey,
    picmeGetFetcher,
    {
      errorRetryCount: 3,
    },
  );

  const parseResultList = data?.flatMap((item) => item.data.result).filter((result) => result);

  return {
    voteListResult: {
      result: parseResultList ?? [],
    },
    isLoading,
    isError: error,
    size,
    setSize,
  };
};

export default useGetCurrentVoteList;
