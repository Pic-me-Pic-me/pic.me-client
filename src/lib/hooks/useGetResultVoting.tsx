import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { ResultSticker } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

export const useGetResultVoting = (pictureId: number) => {
  const { data, error } = useSWR<AxiosResponse<ResultSticker>>(`/vote/player/${pictureId}`, picmeGetFetcher, {
    // 실패시 재요청 3번
    errorRetryCount: 3,
  });
  return {
    stickerInfo: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};
