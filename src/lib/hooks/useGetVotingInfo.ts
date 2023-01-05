import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { VotingInfo } from '../../types/voting';
import { client } from '../axios';

export const useGetVotingInfo = (vote_id: number) => {
  const { data, error } = useSWR<AxiosResponse<VotingInfo>>(`/vote?vote_id=${vote_id}`, client.get, {
    // 실패시 재요청 3번
    errorRetryCount: 3,
  });
  return {
    votingInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
};
