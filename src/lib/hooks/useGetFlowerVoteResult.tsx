import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { MakerFlowerInfo } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

const useGetFlowerVoteResult = (voteId: string | undefined) => {
  const { data, error } = useSWR<AxiosResponse<MakerFlowerInfo>>(`flower/library/${voteId}`, picmeGetFetcher, {
    errorRetryCount: 3,
  });

  return {
    voteResult: data?.data,
    isLoading: !error && !data?.data,
    isError: error,
  };
};

export default useGetFlowerVoteResult;
