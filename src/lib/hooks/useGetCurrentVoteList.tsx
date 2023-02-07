import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { VoteResultData } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

const useGetCurrentVoteList = (cursorId: string) => {
  const { data, error } = useSWR<AxiosResponse<VoteResultData>>(`vote/list/${cursorId}`, picmeGetFetcher, {
    errorRetryCount: 3,
  });
  console.log(cursorId, data);

  return {
    voteListResult: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
  };
};

export default useGetCurrentVoteList;
