import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { MakerVoteInfo } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

const useGetFlowerVoteDetail = (voteId: string | undefined) => {
  const { data, error } = useSWR<AxiosResponse<MakerVoteInfo>>(`vote/common/${voteId}`, picmeGetFetcher, {
    errorRetryCount: 3,
  });

  return {
    flowerResult: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useGetFlowerVoteDetail;
