import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { MakerFlowerVoteInfo } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

const useGetFlowerVoteResult = (voteId: string | undefined) => {
  const { data, error } = useSWR<AxiosResponse<MakerFlowerVoteInfo>>(`flower/library/${voteId}`, picmeGetFetcher, {
    errorRetryCount: 3,
  });

  return {
    voteResult: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
  };
};

export default useGetFlowerVoteResult;
