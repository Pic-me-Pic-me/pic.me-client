import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { MakerVoteInfo } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

const useGetFlowerVoteDetailData = () => {
  const { data, error } = useSWR<AxiosResponse<MakerVoteInfo>>(
    'flower/library/U2FsdGVkX1p1L2u3SFOgBFpp1L2u3SWo3OvtumaQamkABo9fBThp1L2u3Sw8we1Q2u3A4ll',
    picmeGetFetcher,
    {
      errorRetryCount: 3,
    },
  );

  return {
    flowerResult: data,
  };
};

export default useGetFlowerVoteDetailData;
