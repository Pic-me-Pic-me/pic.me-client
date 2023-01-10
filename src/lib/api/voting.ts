import useSWR from 'swr';

import { VotingInfo } from '../../types/vote';
import { client } from '../axios';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/close/${voteid}`);
  console.log(res);
  return res;
};
