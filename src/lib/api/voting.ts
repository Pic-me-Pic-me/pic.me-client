import useSWR from 'swr';

import { client } from '../axios';
import { VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/close/${voteid}`);
  console.log(res);
  return res;
};
