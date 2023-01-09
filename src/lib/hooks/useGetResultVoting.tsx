import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { GetResultVoting } from '../../types/voting';
import { client } from '../axios';

export const useGetResultVoting = (vote_id: number) => {
  const { data, error } = useSWR<AxiosResponse<GetResultVoting>>(`/vote/result/${vote_id}`, client.get, {
    // 실패시 재요청 3번
    errorRetryCount: 3,
  });
  return {
    stickerInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
};
