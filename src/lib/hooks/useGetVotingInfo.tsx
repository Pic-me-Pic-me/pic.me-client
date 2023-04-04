import useSWR from 'swr';

import { VoteInfo, VotingAxiosResponse } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

export const useGetVotingInfo = (vote_id: string | undefined) => {
  const { data, error } = useSWR<VotingAxiosResponse<VoteInfo>>(`/vote/common/pictures/${vote_id}`, picmeGetFetcher, {
    errorRetryCount: 3,
  });
  return {
    votingInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
};
