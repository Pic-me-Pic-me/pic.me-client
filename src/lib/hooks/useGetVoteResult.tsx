import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { MakerVoteInfo } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

const useGetVoteResult = (voteId: string | undefined) => {
  const { data, error } = useSWR<AxiosResponse<MakerVoteInfo>>(`/vote/library/${voteId}`, picmeGetFetcher, {
    errorRetryCount: 3,
  });

  return {
    voteResult: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
  };
};

export default useGetVoteResult;
