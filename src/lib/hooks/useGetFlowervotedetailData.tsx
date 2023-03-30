import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { MakerVoteInfo } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

const useGetFlowervotedetailData = () => {
  const { data, error } = useSWR<AxiosResponse<MakerVoteInfo>>(
    'flower/library/U2FsdGVkX19gNC8J3VE8Cp1L2u3SV4sy0oJ2hBTCBdftLY15oe1Q2u3A4l',
    picmeGetFetcher,
    {
      errorRetryCount: 3,
    },
  );

  return {
    flowerResult: data?.data,
  };
};

export default useGetFlowervotedetailData;
